import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts';
import {
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
    TrendingUp,
    PieChart as PieChartIcon,
    BarChart2,
    LineChart as LineChartIcon
} from 'lucide-react';
import './ReportesDashboard.css';

const COLORS = [
    '#3b82f6', '#f59e0b', '#10b981', '#6366f1', '#8b5cf6',
    '#ec4899', '#f43f5e', '#64748b'
];

const StatusCard = ({ icon: Icon, label, value, colorClass }) => (
    <div className="status-card">
        <div className={`status-icon ${colorClass}`}>
            <Icon color="white" size={24} />
        </div>
        <div className="status-info">
            <div className="status-label">{label}</div>
            <div className="status-value">{value}</div>
        </div>
    </div>
);

const ReportesDashboard = ({ data }) => {
    const { reportes, reportesPorTipo, reportesPorMes } = data;

    // Ordenar reportes por tipo de mayor a menor
    const sortedReportesPorTipo = [...reportesPorTipo]
        .sort((a, b) => b.count - a.count);

    return (
        <div className="reports-dashboard">
            <div className="dashboard-grid">
                {/* Status Cards */}
                <div className="card full-width">
                    <h3 className="card-title">
                        <FileText size={20} />
                        Resumen de Reportes
                    </h3>
                    <div className="status-cards">
                        <StatusCard
                            icon={FileText}
                            label="Total Reportes"
                            value={reportes.totalReportes}
                            colorClass="icon-total"
                        />
                        <StatusCard
                            icon={AlertCircle}
                            label="Sin Atender"
                            value={reportes.totalReportesSinAtender}
                            colorClass="icon-pending"
                        />
                        <StatusCard
                            icon={CheckCircle}
                            label="Atendidos"
                            value={reportes.totalReportesAtendidos}
                            colorClass="icon-attended"
                        />
                        <StatusCard
                            icon={Clock}
                            label="En Espera"
                            value={reportes.reportesEnEspera}
                            colorClass="icon-waiting"
                        />
                        <StatusCard
                            icon={TrendingUp}
                            label="Promedio Diario"
                            value={reportes.promedioDiario}
                            colorClass="icon-average"
                        />
                    </div>
                </div>

                {/* Reportes por Tipo */}
                <div className="card">
                    <h3 className="card-title">
                        <PieChartIcon size={20} />
                        Distribución por Tipo de Reporte
                    </h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={sortedReportesPorTipo}
                                    nameKey="tipo_reporte"
                                    dataKey="count"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={2}
                                >
                                    {sortedReportesPorTipo.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="legend-container">
                        {sortedReportesPorTipo.map((item, index) => (
                            <div key={item.tipo_reporte} className="legend-item">
                                <div
                                    className="legend-color"
                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span>{item.tipo_reporte}: {item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reportes por Mes */}
                <div className="card">
                    <h3 className="card-title">
                        <LineChartIcon size={20} />
                        Tendencia Mensual de Reportes
                    </h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={reportesPorMes}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="cantidad"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ fill: '#3b82f6' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Comparativa por Tipo */}
                <div className="card">
                    <h3 className="card-title">
                        <BarChart2 size={20} />
                        Comparativa por Tipo de Reporte
                    </h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={sortedReportesPorTipo}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="tipo_reporte" angle={-45} textAnchor="end" height={100} />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportesDashboard;