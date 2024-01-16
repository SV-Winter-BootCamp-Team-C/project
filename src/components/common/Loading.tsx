function Loading() {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center h-screen bg-gray-100 bg-opacity-10">
      <div className="w-10 h-10 border-4 border-solid rounded-full border-gray border-t-darkGray animate-spin" />
      <div className="pt-4">Loading</div>
    </div>
  );
}

export default Loading;
