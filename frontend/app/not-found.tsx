export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-space-indigo-950 text-center px-6">
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-lavender-purple-400 to-azure-blue-400 bg-clip-text text-transparent">404</h1>
      <p className="text-space-indigo-200 mb-6 text-sm max-w-md">Página não encontrada. O conteúdo que você procura pode ter sido movido ou ainda não existe.</p>
      <a href="/" className="px-5 py-2 rounded-xl bg-azure-blue-600 hover:bg-azure-blue-500 text-sm font-medium transition">Voltar para início</a>
    </main>
  );
}
