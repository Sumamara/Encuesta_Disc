import { discCategories, getDiscProfile } from "./quizData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Info, Trophy, Target, Zap, Heart, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

interface QuizResultProps {
    scores: Record<string, number>;
    onRetake: () => void;
    userName?: string;
}

const SECTION_CONFIG: Record<string, { color: string; icon: any; textColor: string; label: string }> = {
    D: { color: "#ef4444", icon: Target, textColor: "#fff", label: "Dominancia" },
    I: { color: "#f59e0b", icon: Zap, textColor: "#fff", label: "Influencia" },
    S: { color: "#10b981", icon: Heart, textColor: "#fff", label: "Estabilidad" },
    C: { color: "#3b82f6", icon: ShieldCheck, textColor: "#fff", label: "Conciencia" },
};

const BASE_OUTER_RADIUS = 105;

const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, startAngle, endAngle, fill, payload } = props;
    const score = (payload && typeof payload.realScore === 'number') ? payload.realScore : 0;
    // Normalize score from [-24, 24] to [0, 48] for visualization
    const normalizedScore = score + 24;
    const maxPossible = 48;

    const actualRadius = innerRadius + (BASE_OUTER_RADIUS - innerRadius) * (normalizedScore / maxPossible);

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={actualRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                stroke="#fff"
                strokeWidth={2}
                cornerRadius={4}
            />
        </g>
    );
};

const renderScoreLabel = (props: any, expandedSection: string | null) => {
    const { cx, cy, payload } = props;
    if (payload.sectionId !== expandedSection) return null;

    const scoreValue = payload.realScore;
    const color = SECTION_CONFIG[payload.sectionId].color;

    return (
        <g style={{ pointerEvents: 'none' }}>
            <circle
                cx={cx}
                cy={cy}
                r={24}
                fill="white"
                stroke={color}
                strokeWidth={3}
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}
            />
            <text
                x={cx}
                y={cy}
                dy={1}
                fill={color}
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight="800"
                fontSize={14}
            >
                {scoreValue > 0 ? `+${scoreValue}` : scoreValue}
            </text>
        </g>
    );
};

const QuizResult = ({ scores, onRetake, userName }: QuizResultProps) => {
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    const roseData = Object.keys(discCategories).map(id => {
        const config = SECTION_CONFIG[id];
        return {
            name: config.label,
            realScore: scores[id] || 0,
            sectionId: id,
            value: 1,
            fill: config.color,
            icon: config.icon,
            textColor: config.textColor
        };
    });

    const renderOuterLabel = (props: any) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;
        const RADIAN = Math.PI / 180;
        const labelRadius = (innerRadius + outerRadius) / 2;

        const x = cx + labelRadius * Math.cos(-midAngle * RADIAN);
        const y = cy + labelRadius * Math.sin(-midAngle * RADIAN);
        const rotateAngle = -midAngle + 90;

        const item = roseData[index];

        return (
            <g transform={`translate(${x}, ${y}) rotate(${rotateAngle})`} style={{ pointerEvents: 'none' }}>
                <text
                    x={0}
                    y={0}
                    dy="0.35em"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize={12}
                    fontWeight="900"
                    style={{ textTransform: 'uppercase', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.35)' }}
                >
                    {item.name}
                </text>
            </g>
        );
    };

    const handleSliceClick = (data: any) => {
        if (!data || !data.sectionId) return;
        setExpandedSection(prev => prev === data.sectionId ? null : data.sectionId);
    };

    const profile = getDiscProfile(scores);
    const sortedCategories = Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .map(([id]) => discCategories[id]);

    return (
        <div className="w-full max-w-5xl animate-fade-in text-center space-y-12 pb-20 px-4">
            <div className="space-y-4 pt-4 border-b pb-8">
                <p className="text-sm font-bold uppercase tracking-widest text-primary/80">
                    {userName ? `Hola ${userName}, ` : ""}estos son tus resultados DISC:
                </p>
                <div className="space-y-1">
                    <h2 className="text-3xl font-black tracking-tight">Tu Perfil: <span className="text-primary">{profile.profileCode}</span></h2>
                    <p className="text-muted-foreground text-sm">Tu estilo dominante es {profile.primary.title}</p>
                </div>

                <div className="h-[380px] w-full flex justify-center relative">
                    {!expandedSection && (
                        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                            <p className="text-sm text-muted-foreground font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-border/50 animate-pulse">
                                👆 Toca para ver el puntaje neto
                            </p>
                        </div>
                    )}
                    <div className="relative z-20 w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                {[26, 52, 78, 104].map((radius, i) => (
                                    <Pie
                                        key={`grid-${i}`}
                                        data={[{ value: 1 }]}
                                        dataKey="value"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={radius - 1}
                                        outerRadius={radius}
                                        fill="none"
                                        stroke="#cbd5e1"
                                        strokeWidth={1}
                                        strokeDasharray="4 4"
                                        isAnimationActive={false}
                                    />
                                ))}

                                <Pie
                                    data={roseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={BASE_OUTER_RADIUS}
                                    dataKey="value"
                                    isAnimationActive={false}
                                    stroke="#fff"
                                    strokeWidth={2}
                                    onClick={handleSliceClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {roseData.map((entry, index) => (
                                        <Cell key={`bg-cell-${index}`} fill={entry.fill} fillOpacity={0.1} />
                                    ))}
                                </Pie>

                                <Pie
                                    data={roseData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    dataKey="value"
                                    activeIndex={roseData.map((_, i) => i)}
                                    activeShape={renderActiveShape}
                                    isAnimationActive={true}
                                    stroke="#fff"
                                    strokeWidth={2}
                                    onClick={handleSliceClick}
                                    style={{ cursor: 'pointer', outline: 'none' }}
                                    label={(props) => renderScoreLabel(props, expandedSection)}
                                    labelLine={false}
                                >
                                    {roseData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.fill}
                                            fillOpacity={0.8}
                                        />
                                    ))}
                                </Pie>

                                <Pie
                                    data={roseData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={115}
                                    outerRadius={155}
                                    paddingAngle={3}
                                    cornerRadius={5}
                                    labelLine={false}
                                    label={renderOuterLabel}
                                    isAnimationActive={true}
                                    onClick={handleSliceClick}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {roseData.map((entry, index) => (
                                        <Cell key={`ring-${index}`} fill={entry.fill} stroke={entry.fill} strokeWidth={1} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Dominant Style Hero */}
            <div className="space-y-6">
                <div className="space-y-4">
                    <p className="text-sm font-bold uppercase tracking-widest text-primary/80">Tu estilo dominante es</p>
                    <h1 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
                        {profile.primary.title}
                    </h1>
                    <p className="text-lg text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
                        {profile.primary.description}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto p-6 md:p-10 bg-card border rounded-3xl shadow-sm text-left grid gap-8 md:gap-12 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Info className="h-4 w-4" />
                            ¿Cómo eres?
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                            {profile.primary.whyImportant}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            Plan de Crecimiento
                        </div>
                        <ul className="space-y-4">
                            {profile.primary.actionPlan.map((action, idx) => (
                                <li key={idx} className="flex gap-4">
                                    <div className="h-8 w-8 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                        {idx + 1}
                                    </div>
                                    <span>
                                        <strong className="text-foreground block mb-1">{action.title}</strong>
                                        <span className="text-muted-foreground leading-snug">{action.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Secondary Style Banner */}
            <div className="space-y-4">
                <h3 className="text-center font-bold uppercase tracking-widest text-primary/80 text-sm">
                    Tu estilo secundario es
                </h3>
                <div className="w-full bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-3xl p-8 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Trophy className="w-32 h-32 text-primary" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="p-4 bg-primary/10 rounded-full text-primary shrink-0">
                            <Zap className="h-8 w-8" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-black text-foreground">
                                {profile.secondary.title}
                            </h3>
                            <p className="text-muted-foreground">{profile.secondary.tagline}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="space-y-6 text-left max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 border-b pb-4">
                    <h2 className="text-xl font-bold">Desglose por Estilos</h2>
                    <span className="text-sm text-muted-foreground">Comparativa de tus tendencias</span>
                </div>

                <div className="grid gap-4">
                    {sortedCategories.map((cat) => {
                        const score = scores[cat.id];
                        const isExpanded = expandedSection === cat.id;
                        const config = SECTION_CONFIG[cat.id];

                        return (
                            <div key={cat.id} className="bg-muted/20 rounded-xl overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => setExpandedSection(isExpanded ? null : cat.id)}
                                    className="w-full flex items-center justify-between p-4 gap-4 hover:bg-muted/30 text-left transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div 
                                            className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-white border transition-all"
                                            style={{ backgroundColor: config.color, borderColor: config.color }}
                                        >
                                            {cat.id}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider font-semibold">{cat.advantage}</p>
                                            <h3 className="font-bold text-lg leading-tight">{cat.title}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-lg font-black font-mono">
                                            {score > 0 ? `+${score}` : score}
                                        </div>
                                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                                    </div>
                                </button>

                                {isExpanded && (
                                    <div className="px-4 pb-4 animate-in slide-in-from-top-2 fade-in duration-200">
                                        <div className="p-4 bg-background/50 rounded-lg border border-border/50 text-sm space-y-3">
                                            <p className="text-muted-foreground leading-relaxed">{cat.description}</p>
                                            <div className="space-y-1">
                                                <p className="font-bold text-primary">Área de enfoque:</p>
                                                <p className="text-muted-foreground">{cat.focus}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" size="lg" onClick={onRetake} className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a realizar el test
                </Button>
            </div>
        </div>
    );
};

export default QuizResult;
