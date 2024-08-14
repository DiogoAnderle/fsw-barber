import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import { redirect } from "next/navigation"
import { db } from "../_lib/prisma"
import BookingItem from "../_components/booking-item"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return redirect("/")

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
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

  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
          Confirmados
        </h2>

        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}

        <h2 className="text-x2 mb-2 mt-6 font-bold uppercase text-gray-400">
          Finalizados
        </h2>

        {concludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  )
}

export default Bookings
