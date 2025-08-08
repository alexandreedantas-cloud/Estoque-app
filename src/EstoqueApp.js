import React, { useState, useEffect } from 'react';
import Image from "next/image";

export default function EstoqueApp() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("estoque_produtos");
    if (dadosSalvos) {
      setProdutos(JSON.parse(dadosSalvos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("estoque_produtos", JSON.stringify(produtos));
  }, [produtos]);

  const login = () => setUsuarioLogado(true);

  const adicionarProduto = () => {
    if (novoProduto.trim() && Number.isInteger(quantidade) && quantidade > 0) {
      setProdutos((prev) => [...prev, { nome: novoProduto.trim(), quantidade }]);
      setNovoProduto("");
      setQuantidade(0);
    }
  };

  const removerProduto = (index) => {
    setProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuantidadeChange = (e) => {
    const n = parseInt(e.target.value, 10);
    setQuantidade(Number.isNaN(n) ? 0 : n);
  };

  if (!usuarioLogado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-blue-500">
        <div className="p-6 rounded-2xl shadow-xl bg-white text-center">
          <Image src="/logo.png" alt="Logo" width={200} height={200} />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl" onClick={login}>
            Entrar no Sistema
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Controle de Estoque</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Nome do produto"
          value={novoProduto}
          onChange={(e) => setNovoProduto(e.target.value)}
          className="border p-2 rounded-lg flex-1"
        />
        <input
          type="number"
          placeholder="Qtd"
          value={quantidade}
          onChange={handleQuantidadeChange}
          className="border p-2 rounded-lg w-24"
          min="0"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={adicionarProduto}>
          Adicionar
        </button>
      </div>

      <div className="grid gap-4">
        {produtos.length === 0 && <div className="text-center text-gray-500">Nenhum produto cadastrado.</div>}
        {produtos.map((produto, index) => (
          <div key={index} className="p-4 flex justify-between items-center bg-white shadow rounded-lg">
            <span>{produto.nome} - {produto.quantidade} unid.</span>
            <div className="flex gap-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => {
                setProdutos((prev) => prev.map((p, i) => i === index ? { ...p, quantidade: Math.max(0, p.quantidade - 1) } : p));
              }}>
                -1
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" onClick={() => {
                setProdutos((prev) => prev.map((p, i) => i === index ? { ...p, quantidade: p.quantidade + 1 } : p));
              }}>
                +1
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" onClick={() => removerProduto(index)}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
