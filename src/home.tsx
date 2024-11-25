
import {
  View,
  TextInput,
  Button,
  FlatList,
  Pressable,
  Text,
  Alert,
} from 'react-native';

import { useSQLiteContext } from "expo-sqlite"
import { drizzle } from "drizzle-orm/expo-sqlite"
import * as aulaSchema from "../src/database/schemas/aulaSchema"
import * as conteudoSchema from "../src/database/schemas/conteudoSchema"
import * as frequenciaSchema from "../src/database/schemas/frequenciaSchema"
import { asc, eq, like, sql} from "drizzle-orm"
import { useEffect } from 'react';

const mock = {
  aula: [
    {
      name:'aulaqualquer231s22',
      frequencia: [
        {  name: "João Silva", ausente: 0 },
        {  name: "Maria Oliveira", ausente: 1 }
      ]
    },
    {
      name:'aulaqualquer1232s2',
      frequencia: [
        { name: "Carlos Almeida", ausente: 0 },
        {  name: "Ana Costa", ausente: 1 }
      ]
    }
  ]
};

type aula = {
  id: number
  frequencia: frequencia[]
}

type frequencia = {
  id: number,
  name: string,
  ausente: number,
  aulaId: number
}

export function Home() {
  const database = useSQLiteContext()
  const db = drizzle(database, { schema: aulaSchema })

  async function add() {
    try {
      await db.transaction(async (tx) => {

        for (const aula of mock.aula) {
                  //validação se aula já existe
          const existingAula = await db.query.aula.findFirst({
            where: (users, { eq, or }) => 
              or(
                //eq(aulaSchema.aula.id, aulaSchema.aula.id), 
                eq(aulaSchema.aula.name, aula.name)
              ),
          });
          
          // Se não existir, insere a aula
          if (existingAula) {
            console.log( 'a aula existe!');
          }else{
          // Inserir a aula
          const aulaResult = await tx
            .insert(aulaSchema.aula)
            .values(aula) // Adiciona a aula
            .returning({ idAula: aulaSchema.aula.id });

          const aulaId = aulaResult[0].idAula;
          //------
          const frequencias = aula.frequencia.map((freq) => ({
            name: freq.name,
            ausente: freq.ausente,
            aulaId: aulaId,
          }));
          
          await tx.insert(frequenciaSchema.frequencia).values(frequencias); //inserção em lote
        //------
        // const conteudos = aula.conteudo.map((cont) => ({
        //   id: cont.id,
        //   name: cont.name,
        //   aulaId: aulaId,
        // }));
        
        // await tx.insert(conteudoSchema.conteudo).values(conteudos); //inserção em lote
        console.log("Todas as aulas e frequências foram adicionadas com sucesso!");
        }
        
      }
      });
      
    } catch (error) {
      console.error("Erro ao adicionar as aulas:", error);
      
    }
  }

  useEffect(() => {
    add();
  }, [])


  return (
    <View style={{ flex: 1, padding: 32, gap: 16 }}>
        <Text>Olá</Text>
    </View>
  )
}