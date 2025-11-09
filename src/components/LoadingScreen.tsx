const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        {/* Outer rotating ring with cyan to purple gradient */}
        <div 
          className="w-24 h-24 rounded-full animate-spin"
          style={{ 
            background: 'conic-gradient(from 0deg, hsl(var(--aurora-cyan)), hsl(var(--aurora-magenta)), hsl(var(--aurora-violet)), hsl(var(--aurora-cyan)))',
            maskImage: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 3px))',
            WebkitMaskImage: 'radial-gradient(farthest-side, transparent calc(100% - 4px), white calc(100% - 3px))',
            animation: 'spin 1.5s linear infinite'
          }} 
        />
        
        {/* Inner pulsing glow */}
        <div 
          className="absolute w-16 h-16 rounded-full blur-xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, hsl(var(--aurora-cyan) / 0.4), hsl(var(--aurora-magenta) / 0.3), transparent)',
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Center dot */}
        <div 
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--aurora-cyan)), hsl(var(--aurora-magenta)))'
          }}
        />
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(0.9);
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
