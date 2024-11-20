import React, { useEffect, useRef } from 'react';
import { init, getInstanceByDom } from 'echarts';
import type { EChartsOption } from 'echarts';
import { Thermometer } from 'lucide-react';

interface TemperatureGaugeProps {
  temperature: number;
}

const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({ temperature }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    let chart = getInstanceByDom(chartRef.current);
    
    if (!chart) {
      chart = init(chartRef.current);
    }

    const option: EChartsOption = {
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91'
          },
          progress: {
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              color: '#999'
            }
          },
          axisLabel: {
            distance: -20,
            color: '#999',
            fontSize: 20
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 60,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'inherit'
          },
          data: [{ value: temperature }]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 60,
          itemStyle: {
            color: '#FD7347'
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [{ value: temperature }]
        }
      ]
    };

    chart.setOption(option);

    return () => {
      chart?.dispose();
    };
  }, [temperature]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Thermometer className="w-6 h-6 text-orange-500" />
          Temperature Monitor
        </h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      <div ref={chartRef} style={{ height: '400px' }} />
    </div>
  );
};

export default TemperatureGauge;