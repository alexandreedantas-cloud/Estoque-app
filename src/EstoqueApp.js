import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import logo from "../public/logo.png";

export default function EstoqueApp() {
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState("");
  const [quantidade, setQuantidade] = useState(0);

  const login = () => setUsuarioLogado(true);

  const adicionarProduto = () => {
    if (novoProduto.trim() && Number.isFinite(quantidade) && quantidade > 0) {
      setProdutos((prev) => [...prev, { nome: novoProduto.trim(), quantidade }]);
      setNovoProduto("");
      setQuantidade(0);
    }
  };

  const removerProduto = (index) => {
    setProdutos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleQuantidadeChange = (e) => {
    const v = e.target.value;
    const n = v === '' ? 0 : parseInt(v, 10);
    setQuantidade(Number.isNaN(n) ? 0 : n);
  };

  if (!usuarioLogado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-blue-500">
        <Card className="p-6 rounded-2xl shadow-xl bg-white text-center">
          <CardContent>
            <Image src={logo} alt="Logo" className="mx-auto mb-4" width={200} height={200} />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl" onClick={login}>
              Entrar no Sistema
            </Button>
          </CardContent>
        </Card>
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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={adicionarProduto}>
          Adicionar
        </Button>
      </div>

      <div className="grid gap-4">
        {produtos.length === 0 && <div className="text-center text-gray-500">Nenhum produto cadastrado.</div>}
        {produtos.map((produto, index) => (
          <Card key={index} className="p-4 flex justify-between items-center">
            <span>{produto.nome} - {produto.quantidade} unid.</span>
            <div className="flex gap-2">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded" onClick={() => {
                setProdutos((prev) => prev.map((p, i) => i === index ? { ...p, quantidade: Math.max(0, p.quantidade - 1) } : p));
              }}>
                -1
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded" onClick={() => {
                setProdutos((prev) => prev.map((p, i) => i === index ? { ...p, quantidade: p.quantidade + 1 } : p));
              }}>
                +1
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => removerProduto(index)}>
                Remover
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
