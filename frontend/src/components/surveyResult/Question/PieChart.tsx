import Chart from 'react-apexcharts';
import typeIcon from '../../../assets/type.svg';
import { QuestionData } from '../../../types/questionData';

interface PieChartProps {
  index: number;
  question: QuestionData;
}

const QUESTION_TYPE = {
  MULTIPLE_CHOICE: '객관식',
  CHECKBOX: '체크박스',
  DROPDOWN: '드롭다운',
};

function PieChart({ index, question }: PieChartProps) {
  const getQuestionType = (type: string): string => {
    return QUESTION_TYPE[type as keyof typeof QUESTION_TYPE];
  };

  const chartSeries = question.choices?.map((choice) => choice.count) || [];

  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: question.choices?.map((choice) => choice.option),
    legend: {
      position: 'right',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 150,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        fontWeight: 'medium',
        colors: ['white'],
      },
    },
    plotOptions: {
      pie: {
        stroke: {
          width: 0,
        },
      },
    },
    colors: ['#66629F', '#918DCA', '#BFBBFF', '#E5E4FF'],
  };

  return (
    <div
      className="flex flex-col items-center justify-center rounded-[1.25rem] bg-white border border-purple"
      style={{ boxShadow: '0 0 0.25rem 0.25rem rgba(145,141,202,0.25)' }}
    >
      <div className="flex flex-col items-center justify-center w-[50rem]">
        <div className="flex justify-between w-full mt-4">
          <div className="flex items-center ml-4">
            <button type="button" className="items-center focus:outline-none">
              <img src={typeIcon} alt="Type" className="w-5 h-5" />
            </button>
            <span className="ml-2 font-medium text-left text-darkGray">{getQuestionType(question.type)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <span className="text-[2rem] font-semibold text-center text-black -translate-y-4">Q{index}.</span>
        </div>

        <div className="flex justify-center items-center w-[14.375rem] max-w-[50rem] h-8 ">
          <p className="text-base text-black">{question.content}</p>
        </div>

        {question.imageUrl && (
          <div className="mt-4">
            <img
              src={question.imageUrl}
              alt="Preview"
              className="rounded-[0.625rem] border-2 border-solid border-gray max-w-[45rem] max-h-[45rem]"
            />
          </div>
        )}

        <div className="py-9">
          {chartSeries.length > 0 ? (
            <Chart options={chartOptions as any} series={chartSeries as number[]} type="donut" />
          ) : (
            <p className="text-base text-gray">설문 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PieChart;
