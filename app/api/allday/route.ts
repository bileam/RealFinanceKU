
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // 1. Mengambil idUser dari query parameter URL
    const idUser = request.nextUrl.searchParams.get("idUser");

    // 2. Validasi: pastikan idUser dikirim
    if (!idUser) {
      return NextResponse.json(
        {
          success: false,
          message: "idUser wajib diisi",
        },
        { status: 400 }
      );
    }

    // 3. Menghitung total pemasukan pengguna
    const incomeResult = await prisma.transaction.aggregate({
      where: {
        userId: idUser,
        type: "income",
        status: "success",
      },
      _sum: {
        amount: true,
      },
    });

    // 4. Menghitung total pengeluaran pengguna
    const expenseResult = await prisma.transaction.aggregate({
      where: {
        userId: idUser,
        type: "expense",
        status: "success",
      },
      _sum: {
        amount: true,
      },
    });

    // 5. Mengubah hasil menjadi Number
    // Jika belum ada transaksi, nilai awalnya 0
    const pemasukan = Number(incomeResult._sum.amount ?? 0);
    const pengeluaran = Number(expenseResult._sum.amount ?? 0);

    // 6. Menghitung saldo
    const saldo = pemasukan - pengeluaran;

    // 7. Mengirim respons ke frontend
    return NextResponse.json({
      success: true,
      data: {
        pemasukan,
        pengeluaran,
        sisa_saldo: saldo,
      },
    });
  } catch (error) {
    // 8. Mencatat error untuk diperiksa di terminal
    console.error("Terjadi kesalahan saat mengambil data:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada sisi server",
      },
      { status: 500 }
    );
  }
}
