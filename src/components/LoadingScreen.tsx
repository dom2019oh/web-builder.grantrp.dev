const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative">
        {/* Aurora gradient spinner */}
        <div className="w-20 h-20 rounded-full border-4 border-transparent border-t-aurora-cyan border-r-aurora-magenta animate-spin" 
             style={{ 
               background: 'linear-gradient(135deg, transparent, transparent)',
               animation: 'spin 1s linear infinite'
             }} 
        />
        <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-aurora-magenta opacity-20 blur-xl animate-pulse" />
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
