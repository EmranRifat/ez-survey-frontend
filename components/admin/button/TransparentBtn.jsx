

function TransparentBtn({ title, action }) {
  return (
    <button
      aria-label="none"
      onClick={() => (action ? action() : "")}
      className="py-3 px-6 border bg-white border-bgray-500 rounded-lg text-sm font-medium text-bgray-600 dark:bg-darkblack-600 dark:text-white"
    >
      {title}
    </button>
  );
}


export default TransparentBtn;
