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
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

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

  return (
    <div>
      {/* HEADER */}
      <Header />

      <div className="m-0 w-full p-5">
        <div className="md:flex md:w-full md:items-center md:justify-around md:gap-2">
          <div className="md:w-[45%]">
            {/* SAUDAÇÃO */}
            <section>
              <h2 className="text-xl font-bold">
                Olá, {session?.user ? session?.user.name : "bem vindo"}!
              </h2>
              <p>
                <span className="capitalize">
                  {format(new Date(), "EEEE, d ", { locale: ptBR })}
                </span>
                de {format(new Date(), "MMMM 'de' Y.", { locale: ptBR })}
              </p>
            </section>
            {/* BUSCA */}
            <div className="-w-full mt-6">
              <Search />
            </div>
            {/* BUSCA RÁPIDA */}
            <section className="mt-6 flex gap-3 overflow-x-scroll md:hidden [&::-webkit-scrollbar]:hidden">
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
            <div className="relative mt-6 flex h-[150px] md:hidden">
              <Image
                alt="Agende nos melhores com FSW Barber"
                src="/banner-01.png"
                fill
                className="flex-none rounded-xl object-cover"
              />
            </div>
            {/* AGENDAMENTO */}
            {session?.user ? (
              <section>
                <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
                  Agendamentos
                </h2>

                <Carousel className="relative md:w-full">
                  <div>
                    <CarouselContent className="text-xs">
                      {bookings.map((booking) => (
                        <CarouselItem className="md:basis-1/2" key={booking.id}>
                          <BookingItem booking={booking} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-[-3%] top-[50%] md:left-[0]" />
                    <CarouselNext className="md:none absolute right-[-3%] top-[50%] md:right-[0]" />
                  </div>
                </Carousel>
              </section>
            ) : (
              <h3 className="mt-6 text-gray-400">
                Faça login para e acompanhe seus agendamentos
              </h3>
            )}
          </div>
          <div className="md:w-[50%]">
            {/* RECOMENDADOS */}
            <section className="md:w-full">
              <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
                Recomendados
              </h2>
              <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* POPULARES */}
        <section>
          <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
            Populares
          </h2>
          <div className="flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
