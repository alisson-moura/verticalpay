interface TaxItem {
  value: string;
  label: string;
  color: string;
}

interface TaxCardsProps {
  taxData: TaxItem[];
}

export function TaxCards({ taxData }: TaxCardsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {taxData.map((tax, index) => (
          <div
            key={index}
            className="bg-transparent backdrop-blur-sm rounded-lg p-4 text-center border border-black/10"
          >
            <div className={`text-2xl font-bold mb-1 ${tax.color}`}>
              {tax.value}
            </div>
            <div className="text-sm text-gray-600">{tax.label}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 italic">
          * Taxas aplicáveis ao plano D+30
        </p>
      </div>
    </div>
  );
}
