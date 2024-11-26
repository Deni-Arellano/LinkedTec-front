import React from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const GraficaPorMes = ({ data, tipoGrafica, categoryKey, valueKey, titulo }) => {
    const renderGrafica = () => {
        switch (tipoGrafica) {
            case "barras":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={categoryKey} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey={valueKey} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case "lineas":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={categoryKey} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey={valueKey} stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            default:
                return <p>Tipo de gráfica no soportado</p>;
        }
    };

    return (
        <div>
            <h3>{titulo}</h3>
            {renderGrafica()}
        </div>
    );
};

export default GraficaPorMes;
