import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  curso,
  objeto_aprendizagem,
  topico,
  unidade_ensino,
} from "@prisma/client";
import { AccordionUnidades } from "@/components/meus-cursos/accordion-unidades";
import SuportChat from "@/components/meus-cursos/SuportChat";

export interface TopicoWithRelations extends topico {
  id: string;
  nome: string;
  descricao: string;
  objeto_aprendizagem: objeto_aprendizagem[];
}

export interface UnidadeEnsinoWithRelations extends unidade_ensino {
  id: string;
  nome: string;
  descricao: string;
  topico: TopicoWithRelations[];
}

export interface CursoWithRelations extends curso {
  id: string;
  nome: string;
  descricao: string;
  unidade_ensino: UnidadeEnsinoWithRelations[];
}

export default function Details() {
  const router = useRouter();
  const { id, selectedObject } = router.query;

  const [curso, setCurso] = useState<CursoWithRelations>();

  const fetchByIdCurso = async (id: string) => {
    try {
      const response = await axios.get<CursoWithRelations>(
        `http://localhost:3000/api/curso/unidade-ensino/topico/objeto-aprendizagem/${id}`
      );
      setCurso(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchByIdObjetoAprendizagem = async (id: string) => {
    try {
      const response = await axios.get<objeto_aprendizagem>(
        `http://localhost:3000/api/objeto-aprendizagem/${id}`
      );
      console.log(response.data); // dado do objeto de aprendizagem selecionado
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) {
      fetchByIdCurso(id as string);
    }
  }, [id]);

  function dadoSidenav() {
    return <>{curso && <AccordionUnidades curso={curso} />}</>;
  }

  return (
    <>
      <div className="flex">
        <div className="w-1/6 h-screen bg-slate-50 sticky top-0 p-4">
          {dadoSidenav()}
        </div>
        <div className="w-5/6 p-4">
          <p>teste</p>
          <p>id do objeto: {selectedObject}</p>

          <SuportChat />
        </div>
      </div>
    </>
  );
}
