import React from "react";
import AdicionarCurso from "@/components/AdicionarCurso";


function SideNavCadastro() {
    return (
        <>
            <div className="flex">
                <nav className="w-1/6 h-screen bg-gray-200 sticky top-0 p-4">
                    <h2 className="text-base font-bold mb-4">Cadastro</h2>
                    <ul>
                        <li className="mb-2" id="1">
                            <a href="/gerenciar/cadastro/topico" className="text-gray-700 hover:text-gray-900">Topico</a>
                        </li>
                        <li className="mb-2" id="2">
                            <a href="/gerenciar/cadastro/curso" className="text-gray-700 hover:text-gray-900">Curso</a>
                        </li>
                        <li className="mb-2" id="3">
                            <a href="/gerenciar/cadastro/turma" className="text-gray-700 hover:text-gray-900">Turma</a>
                        </li>
                    </ul>
                </nav>
                <div className="w-5/6 bg-white p-4">
                </div>
            </div>
        </>
    );
}

export default SideNavCadastro;
