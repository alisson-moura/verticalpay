export function TaxCards() {
  const taxData = [
    { value: "0,00%", label: "no Pix", color: "text-purple-600" },
    { value: "0,75%", label: "no Débito", color: "text-primary" },
    { value: "2,69%", label: "no Crédito 1x", color: "text-primary" },
    { value: "8,99%", label: "no Crédito 12x", color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {taxData.map((tax, index) => (
        <div
          key={index}
          // A única mudança foi aqui na classe da borda
          className="bg-transparent backdrop-blur-sm rounded-lg p-4 text-center border border-black/10"
        >
          <div className={`text-2xl font-bold mb-1 ${tax.color}`}>
            {tax.value}
          </div>
          <div className="text-sm text-gray-600">{tax.label}</div>
        </div>
      ))}
    </div>
  );
}
