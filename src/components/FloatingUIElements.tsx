const FloatingUIElements = () => {
  return (
    <>
      {/* Floating orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-aurora-magenta/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-aurora-cyan/15 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-aurora-violet/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-40 right-1/4 w-72 h-72 bg-aurora-teal/15 rounded-full blur-3xl animate-float" />
      </div>

      {/* Floating geometric shapes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 border-2 border-primary rotate-45 animate-spin-slow" />
        <div className="absolute top-1/3 right-1/3 w-6 h-6 border-2 border-accent rounded-full animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/2 w-5 h-5 border-2 border-aurora-magenta rotate-12 animate-float" />
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-aurora-cyan rounded-full animate-float-delayed" />
        <div className="absolute bottom-1/3 right-1/2 w-4 h-4 bg-aurora-violet/50 rotate-45 animate-spin-slow" />
      </div>

      {/* Animated grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>
    </>
  );
};

export default FloatingUIElements;
