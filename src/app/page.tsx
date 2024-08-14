import Image from "next/image"
import Header from "./_components/header"

import { Button } from "./_components/ui/button"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/quickSearch"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./_components/ui/carousel"

const Home = async () => {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  const now = new Date()

  const dayName = new Array(
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  )

  const monthName = new Array(
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  )

  return (
    <div>
      {/* HEADER */}
      <Header />
      {/* SAUDAÇÃO */}
      <div className="p-5">
        {session?.user && (
          <h2 className="text-xl font-bold">
            Olá, {(session.user as any).name.split(" ")[0]}!
          </h2>
        )}
        <p className="">{`${dayName[now.getDay()]}, ${now.getDate()}  de ${monthName[now.getMonth()]} de ${now.getFullYear()}`}</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RÁPIDA */}
        <section className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`barbershops?service=${option.title}`}>
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={16}
                  height={16}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </section>

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
        <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
          Agendamentos
        </h2>

        <Carousel className="relative">
          <div className="flex justify-end">
            <CarouselContent className="-ml-2 max-w-[95%] text-xs md:-ml-4">
              {bookings.map((booking) => (
                <CarouselItem key={booking.id}>
                  <BookingItem booking={booking} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-3%] top-[50%]" />
            <CarouselNext className="absolute right-[-3%] top-[50%]" />
          </div>
        </Carousel>

        {/* RECOMENDADOS */}
        <section>
          <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 [&::-webkit-scrollbar]:hidden">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>

        {/* POPULARES */}
        <section>
          <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
            Recomendados
          </h2>
          <div className="flex gap-4 [&::-webkit-scrollbar]:hidden">
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
