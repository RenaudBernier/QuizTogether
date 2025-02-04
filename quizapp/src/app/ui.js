export function Button({ children, ...props }) {
    return (
      <button
        className="bg-indigo-500 mb-4 text-white px-8 py-2 text-lg rounded-xl uppercase font-bold hover:bg-indigo-600 transition disabled:opacity-50"
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export function Card({ children }) {
    return <div className="bg-white shadow-lg p-6 rounded-lg">{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-4">{children}</div>;
  }
  