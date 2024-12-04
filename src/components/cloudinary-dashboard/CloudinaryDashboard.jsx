import React from 'react';
import {
    RadialBarChart,
    RadialBar,
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import './CloudinaryDashboard.css';

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: 'white',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px'
            }}>
                <p style={{ margin: 0 }}>
                    {`${payload[0].name}: ${formatBytes(payload[0].value)}`}
                </p>
            </div>
        );
    }
    return null;
};

const CloudinaryDashboard = ({ data }) => {
    const creditData = [
        {
            name: 'Créditos Usados',
            value: (data.creditos_usados / data.creditos_limite) * 100,
        }
    ];

    const resourceData = [
        {
            name: 'Métricas',
            recursos: data.recursos_totales,
            transformaciones: data.transformaciones_totales,
        }
    ];

    const usageData = [
        { name: 'Almacenamiento', value: data.almacenamiento_usado },
        { name: 'Ancho de Banda', value: data.ancho_de_banda_usado },
    ];

    const COLORS = ['#3b82f6', '#10b981'];

    return (
        <div className="cloudinary-dashboard">
            <div className="dashboard-grid">
                <div className="card">
                    <h3 className="card-title">Uso de Créditos</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <RadialBarChart
                                innerRadius="60%"
                                outerRadius="100%"
                                data={creditData}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar
                                    minAngle={15}
                                    background
                                    clockWise={true}
                                    dataKey="value"
                                    fill="#3b82f6"
                                />
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="credits-info">
                        <div className="credits-detail">
                            <div className="credits-item">
                                <span className="credits-label">Usados:</span>
                                <span className="credits-value">{data.creditos_usados}</span>
                            </div>
                            <div className="credits-item">
                                <span className="credits-label">Límite:</span>
                                <span className="credits-value">{data.creditos_limite}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Métricas de Uso</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={resourceData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="recursos" fill="#3b82f6" name="Recursos" />
                                <Bar dataKey="transformaciones" fill="#10b981" name="Transformaciones" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="legend-container">
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                            <span>Recursos: {data.recursos_totales}</span>
                        </div>
                        <div className="legend-item">
                            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
                            <span>Transformaciones: {data.transformaciones_totales}</span>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Peticiones y Límites</h3>
                    <div className="stats-container">
                        <div className="stats-value">{data.peticiones_totales}</div>
                        <div className="stats-label">Peticiones Totales</div>
                        <div className="stats-subtitle">
                            Límite de tasa restante: {data.limite_de_tasa_restante}
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title">Uso de Recursos</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={usageData}
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {usageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="legend-container">
                        {usageData.map((entry, index) => (
                            <div key={entry.name} className="legend-item">
                                <div className="legend-color" style={{ backgroundColor: COLORS[index] }}></div>
                                <span>{entry.name}: {formatBytes(entry.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloudinaryDashboard;