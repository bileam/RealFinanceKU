"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  ChartNoAxesCombined,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Target,
  TrendingUp,
  UserRound,
  Wallet,
} from "lucide-react";
import styles from "./AuthScreen.module.css";

type AuthScreenProps = {
  mode: "login" | "register";
};

export default function AuthScreen({ mode }: AuthScreenProps) {
  const isRegister = mode === "register";
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-label={isRegister ? "Daftar FinTrack" : "Masuk FinTrack"}>
        <aside className={`${styles.promo} ${isRegister ? styles.promoRegister : ""}`}>
          <a className={styles.brand} href="/Login" aria-label="FinTrack beranda">
            <span className={styles.brandIcon}>
              <ChartNoAxesCombined size={21} strokeWidth={2.6} />
            </span>
            <span className={styles.brandWords}>
              <strong>FinTrack</strong>
              <small>Personal Finance Management</small>
            </span>
          </a>

          <div className={styles.promoCopy}>
            <h1>
              {isRegister ? (
                <>Mulai Perjalanan<br />Finansial Anda</>
              ) : (
                <>Kelola Keuangan<br />Lebih Mudah,<br />Masa Depan Lebih Baik</>
              )}
            </h1>
            <p>
              {isRegister
                ? "Buat akun sekarang dan atur keuangan Anda dengan lebih mudah, aman, dan terarah."
                : "Pantau pengeluaran, atur anggaran, dan capai tujuan finansial Anda dengan lebih terencana."}
            </p>
          </div>

          <div className={`${styles.illustration} ${isRegister ? styles.registerIllustration : ""}`}>
            <div className={styles.orbit} />
            {isRegister ? (
              <>
                <div className={styles.targetBadge}><Target size={26} /></div>
                <div className={styles.budgetCard}>
                  <div className={styles.budgetHeading}>
                    <span className={styles.budgetIcon}><Target size={15} /></span>
                    <span><small>Tujuan Finansial</small><strong>Liburan ke Bali</strong></span>
                    <span className={styles.budgetDots}>•••</span>
                  </div>
                  <div className={styles.progress}><span /></div>
                  <div className={styles.progressCaption}><span>Rp 1.200.000</span><span>Rp 5.000.000</span></div>
                  <div className={styles.budgetRow}>
                    <span className={`${styles.rowIcon} ${styles.mint}`}><Wallet size={15} /></span>
                    <span><strong>Makan</strong><small>Harian</small></span>
                    <strong>Rp 120.000</strong>
                  </div>
                  <div className={styles.budgetRow}>
                    <span className={`${styles.rowIcon} ${styles.coral}`}><CarFront size={15} /></span>
                    <span><strong>Transportasi</strong><small>Perjalanan</small></span>
                    <strong>Rp 50.000</strong>
                  </div>
                  <div className={styles.budgetRow}>
                    <span className={`${styles.rowIcon} ${styles.lilac}`}><TrendingUp size={15} /></span>
                    <span><strong>Investasi</strong><small>Tabungan</small></span>
                    <strong>Rp 500.000</strong>
                  </div>
                </div>
                <span className={`${styles.floatBadge} ${styles.calendarBadge}`}><CalendarDays size={22} /></span>
              </>
            ) : (
              <>
                <div className={styles.phone}>
                  <div className={styles.phoneTop}>
                    <span className={styles.miniBrand}><ChartNoAxesCombined size={12} /> FinTrack</span>
                    <span className={styles.phoneMenu}>•••</span>
                  </div>
                  <div className={styles.phoneContent}>
                    <small>Total Saldo</small>
                    <strong className={styles.balance}>Rp 2.578.000</strong>
                    <div className={styles.chart}>
                      <svg viewBox="0 0 190 88" role="img" aria-label="Grafik keuangan meningkat">
                        <defs>
                          <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#7d73f4" stopOpacity=".36" />
                            <stop offset="100%" stopColor="#7d73f4" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path d="M4 72 C27 67 30 55 49 59 S73 50 90 53 S115 27 133 37 S157 20 186 9 L186 88 L4 88Z" fill="url(#chart-fill)" />
                        <path d="M4 72 C27 67 30 55 49 59 S73 50 90 53 S115 27 133 37 S157 20 186 9" fill="none" stroke="#7164ed" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="133" cy="37" r="4" fill="white" stroke="#7164ed" strokeWidth="3" />
                      </svg>
                    </div>
                    <div className={styles.transaction}>
                      <span className={`${styles.rowIcon} ${styles.mint}`}><TrendingUp size={14} /></span>
                      <span><strong>Pemasukan</strong><small>Hari ini</small></span>
                      <strong>+ Rp 350.000</strong>
                    </div>
                    <div className={styles.transaction}>
                      <span className={`${styles.rowIcon} ${styles.coral}`}><Wallet size={14} /></span>
                      <span><strong>Pengeluaran</strong><small>Hari ini</small></span>
                      <strong>- Rp 120.000</strong>
                    </div>
                  </div>
                </div>
                <div className={styles.pieBadge}><span /></div>
                <span className={`${styles.floatBadge} ${styles.walletBadge}`}><Wallet size={20} /></span>
                <span className={`${styles.floatBadge} ${styles.trendBadge}`}><TrendingUp size={18} /></span>
              </>
            )}
          </div>

          <div className={styles.securityNote}>
            <ShieldCheck size={19} strokeWidth={1.7} />
            <span>
              {isRegister ? <>Privasi dan keamanan data<br />Anda terjamin</> : <>Keamanan data Anda<br />adalah prioritas kami</>}
            </span>
          </div>
        </aside>

        <div className={styles.formPanel}>
          <div className={styles.formContent}>
            <header className={styles.formHeader}>
              <h2>{isRegister ? "Buat Akun Baru" : "Selamat Datang Kembali"}</h2>
              <p>{isRegister ? "Isi data Anda untuk mulai menggunakan FinTrack" : "Masuk ke akun FinTrack Anda"}</p>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
              {isRegister && (
                <label className={styles.field}>
                  <span>Nama Lengkap</span>
                  <span className={styles.inputWrap}>
                    <UserRound size={16} />
                    <input autoComplete="name" name="name" placeholder="Masukkan nama lengkap Anda" required />
                  </span>
                </label>
              )}

              <label className={styles.field}>
                <span>Email</span>
                <span className={styles.inputWrap}>
                  <Mail size={16} />
                  <input autoComplete="email" name="email" placeholder="Masukkan email Anda" required type="email" />
                </span>
              </label>

              <label className={styles.field}>
                <span>Password</span>
                <span className={styles.inputWrap}>
                  <LockKeyhole size={16} />
                  <input
                    autoComplete={isRegister ? "new-password" : "current-password"}
                    minLength={isRegister ? 8 : undefined}
                    name="password"
                    placeholder={isRegister ? "Buat password (minimal 8 karakter)" : "Masukkan password Anda"}
                    required
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className={styles.visibilityButton}
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </span>
              </label>

              {isRegister ? (
                <label className={styles.field}>
                  <span>Konfirmasi Password</span>
                  <span className={styles.inputWrap}>
                    <LockKeyhole size={16} />
                    <input
                      autoComplete="new-password"
                      minLength={8}
                      name="passwordConfirmation"
                      placeholder="Konfirmasi password Anda"
                      required
                      type={showConfirmation ? "text" : "password"}
                    />
                    <button
                      aria-label={showConfirmation ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password"}
                      className={styles.visibilityButton}
                      onClick={() => setShowConfirmation((visible) => !visible)}
                      type="button"
                    >
                      {showConfirmation ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </label>
              ) : (
                <div className={styles.formOptions}>
                  <label className={styles.remember}>
                    <input type="checkbox" />
                    <span>Ingat saya</span>
                  </label>
                  <a href="#lupa-password">Lupa password?</a>
                </div>
              )}

              <button className={styles.submitButton} type="submit">
                {isRegister ? "Daftar" : "Masuk"} <ArrowRight size={16} />
              </button>
            </form>

            <div className={styles.divider}><span>atau</span></div>

            <button className={styles.googleButton} type="button">
              <span className={styles.googleMark}>G</span>
              {isRegister ? "Daftar dengan Google" : "Lanjut dengan Google"}
            </button>

            <p className={styles.switchPrompt}>
              {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
              <a href={isRegister ? "/Login" : "/Register"}>
                {isRegister ? "Masuk di sini" : "Daftar sekarang"}
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
