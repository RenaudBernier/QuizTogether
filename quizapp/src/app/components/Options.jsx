const colors = ["#8789C0", "#50C878", "#FB607F", "#FFBF00"]; // Tropical Indigo, Emerald, Brink Pink, Amber

function Option({ answer, idx }) {
  return (
    <div
      className="flex items-center justify-center shadow-lg rounded-lg border border-gray-200 text-white font-bold text-2xl"
      style={{
        backgroundColor: colors[idx % colors.length],
        width: "100%",
        height: "100%",
      }}
    >
      <p>{answer.answer}</p>
    </div>
  );
}

export default function Options({ answers }) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-1/2 fixed bottom-0 p-4">
      {answers.map((ans, index) => (
        <Option key={index} answer={ans} idx={index} />
      ))}
    </div>
  );
}
