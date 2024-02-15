import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { conteudo_disciplina, curso, disciplina } from "@prisma/client";
import SideNavConteudo from "@/components/sideNavConteudo";

export default function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [curso, setCurso] = useState<curso>();
  const [disciplinas, setDisciplinas] = useState<disciplina[]>();
  const [conteudoDisciplinas, setConteudoDisciplinas] = useState<conteudo_disciplina[]>();

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const fetchDisciplinaByIdCurso = async (id: string) => {
    try {
      console.log(id);
      const response = await axios.get(
        `http://localhost:3000/api/disciplina/curso/${id}`
      );
      const curso = response.data;
      setCurso(curso);
      setDisciplinas(
        curso.disciplina_curso.map(
          (disciplina_curso: any) => disciplina_curso.disciplina
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDisciplinaByIdCurso(id as string);
    }
  }, [id]);

  const fetchCursoAndDisciplinasById = async (id: string) => {
    try {
      console.log(id);
      const response = await axios.get(
        `http://localhost:3000/api/curso/${id}`
      );
      const curso = response.data;
      setCurso(curso);
      setDisciplinas(
        curso.disciplina_curso.map(
          (disciplina_curso: any) => disciplina_curso.disciplina
        )
      );
      setConteudoDisciplinas(
        curso.disciplina_curso.flatMap(
          (disciplina_curso: any) => disciplina_curso.disciplina.conteudo_disciplina
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCursoAndDisciplinasById(id as string);
    }
  }, [id]);

  function conteudo() {
    return (
      <div>
        {curso && (
          <div>
            <h1 className="tituloCurso p-3">{curso.nome_curso}</h1>
            <ul>
              {disciplinas &&
                disciplinas.map((disciplina) => (
                  <li key={disciplina.id_disciplina}>
                    {disciplina.nome_disciplina}- {disciplina.descricao} - {disciplina.carga_horaria}
                  </li>
                ))}
            </ul>
            <h1>Aqui exibe o conteúdo</h1>
            <ul>
              {conteudoDisciplinas &&
                conteudoDisciplinas.map((conteudoDisciplina) => (
                  <li key={conteudoDisciplina.id_conteudo_disciplina}>
                    {conteudoDisciplina.conteudo ? conteudoDisciplina.conteudo : null}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <SideNavConteudo
        sideNav={
          curso && (
            <div>
              <ul>
                {disciplinas &&
                  disciplinas.map((disciplina) => (
                    <li key={disciplina.id_disciplina}>
                      <label className="flex items-center mt-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span className="ml-2 text-gray-700">{disciplina.nome_disciplina}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          )

        }
        conteudo={
          curso && (
            <div>
              <h1 className="tituloCurso p-3">{curso.nome_curso}</h1>
              <ul>
                {disciplinas &&
                  disciplinas.map((disciplina) => (
                    <li key={disciplina.id_disciplina}>
                      {disciplina.nome_disciplina}- {disciplina.descricao} - {disciplina.carga_horaria}
                    </li>
                  ))}
              </ul>
            </div>
          )
        }
      />
    </>
  );
}
