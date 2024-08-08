import { SearchIcon } from "lucide-react"
import Image from "next/image"
import Header from "./_components/header"

import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Input } from "./_components/ui/input"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* SAUDAÇÃO */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Diogo!</h2>
        <p className="">Quinta-feira, 08 de agosto de 2024.</p>

        {/* BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/* AGENDAMENTO */}
        <div>
          <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
            Agendamento
          </h2>
          <Card>
            <CardContent className="flex justify-between p-0">
              {/* ESQUERDA */}
              <div className="flex flex-col gap-2 py-5 pl-5">
                <Badge className="w-fit"> Confirmado</Badge>
                <h3 className="font-semibold">Corte de cabelo</h3>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="data:image/png;base64,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" />
                  </Avatar>
                  <p className="text-sm">Barbearia FSW</p>
                </div>
              </div>
              {/* Direita */}
              <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
                <p className="text-sm">Agosto</p>
                <p className="text-2xl">05</p>
                <p className="sm">10:32</p>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* RECINENDADOS */}
        <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
