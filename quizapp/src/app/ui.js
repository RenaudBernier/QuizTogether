export function Button({ children, ...props }) {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
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
  