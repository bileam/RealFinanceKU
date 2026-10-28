
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthenticatedUser } from "@/lib/Auth";

export async function GET() {
  try {
    const idUser = await getAuthenticatedUser()

    if (!idUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Login terlebih dahulu",
        },
        { status: 400 }
      );
    }

    // Awal bulan ini
    const now = new Date();
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );
    // Awal bulan berikutnya
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      1
    );
    // Ambil pemasukan dan pengeluaran bulan ini
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: idUser.id,
        type: {
          in: ["income", "expense"],
        },
        status: "success",
        transactionDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      select: {
        type: true,
        amount: true,
        transactionDate: true,
      },
      orderBy: {
        transactionDate: "asc",
      },
    });

    // Kelompokkan berdasarkan tanggal
    const pemasukanPerTanggal: Record<string, number> = {};
    const pengeluaranPerTanggal: Record<string, number> = {};
    for (const transaction of transactions) {
      const tanggal = new Date(
        transaction.transactionDate
      ).getDate();
      const key = String(tanggal);
      const amount = Number(transaction.amount);
      if (transaction.type === "income") {
        pemasukanPerTanggal[key] =
          (pemasukanPerTanggal[key] ?? 0) + amount;
      }
      if (transaction.type === "expense") {
        pengeluaranPerTanggal[key] =
          (pengeluaranPerTanggal[key] ?? 0) + amount;
      }
    }

    // Buat data tanggal 1 sampai hari ini
    const chartData = [];
    const jumlahHari = now.getDate();

    for (let tanggal = 1; tanggal <= jumlahHari; tanggal++) {
      const date = new Date(
        now.getFullYear(),
        now.getMonth(),
        tanggal
      );
      chartData.push({
        tanggal: date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        pemasukan: pemasukanPerTanggal[String(tanggal)] ?? 0,
        pengeluaran: pengeluaranPerTanggal[String(tanggal)] ?? 0,
      });
    }

    return NextResponse.json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    console.error("Gagal mengambil data chart:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server",
      },
      { status: 500 }
    );
  }
}
