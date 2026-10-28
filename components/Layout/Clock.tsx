"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Clock3,
  Droplets,
  LoaderCircle,
  MapPin,
  RefreshCw,
  Sun,
  Umbrella,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Weather = {
  temperature: number;
  humidity: number;
  precipitationProbability: number | null;
  weatherCode: number;
};

type HourlyForecast = {
  time: string;
  temperature: number;
  humidity: number;
  precipitationProbability: number | null;
  weatherCode: number;
};

type WeatherApiResponse = {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
    time: string;
  };
  hourly?: {
    time: string[];
    precipitation_probability: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
  };
};

type ReverseGeocodingResponse = {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
};

const WEATHER_REFRESH_INTERVAL = 10 * 60 * 1000;

function AnimatedWeatherIcon({
  code,
  Icon,
  className,
  size,
}: {
  code: number;
  Icon: LucideIcon;
  className?: string;
  size?: number;
}) {
  const isRainy = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code);
  const isSunny = code === 0;

  return (
    <span className="relative inline-flex shrink-0 items-center justify-center">
      <Icon
        size={size}
        className={`${className ?? ""} ${
          isSunny ? "weather-sunny-icon" : isRainy ? "weather-rainy-icon" : ""
        }`}
        aria-hidden="true"
      />
      {isRainy && (
        <span className="pointer-events-none absolute inset-x-1 bottom-[-5px] flex justify-center gap-[5px]">
          <span className="weather-rain-drop" />
          <span className="weather-rain-drop" />
          <span className="weather-rain-drop" />
        </span>
      )}
    </span>
  );
}

function getWeatherDescription(code: number): {
  description: string;
  Icon: LucideIcon;
} {
  if (code === 0) return { description: "Cerah", Icon: Sun };
  if (code === 1) return { description: "Cerah berawan", Icon: CloudSun };
  if (code === 2) return { description: "Berawan sebagian", Icon: CloudSun };
  if (code === 3) return { description: "Berawan", Icon: Cloud };
  if ([45, 48].includes(code)) {
    return { description: "Berkabut", Icon: CloudFog };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { description: "Gerimis", Icon: CloudDrizzle };
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { description: "Hujan", Icon: CloudRain };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { description: "Salju", Icon: CloudSnow };
  }
  if ([95, 96, 99].includes(code)) {
    return { description: "Badai petir", Icon: CloudLightning };
  }
  return { description: "Kondisi tidak diketahui", Icon: Cloud };
}

function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Browser ini tidak mendukung akses lokasi."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }),
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error("Izinkan akses lokasi untuk melihat cuaca di sekitar Anda."));
          return;
        }

        if (error.code === error.POSITION_UNAVAILABLE) {
          reject(new Error("Lokasi Anda tidak dapat ditemukan."));
          return;
        }

        reject(new Error("Permintaan lokasi terlalu lama. Silakan coba lagi."));
      },
      { enableHighAccuracy: false, maximumAge: 15 * 60 * 1000, timeout: 15_000 }
    );
  });
}

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [locationName, setLocationName] = useState("Lokasi saat ini");
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [weatherError, setWeatherError] = useState("");
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isWeatherModalOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsWeatherModalOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isWeatherModalOpen]);

  const loadWeather = useCallback(async (position: Coordinates) => {
    setIsRefreshing(true);
    setWeatherError("");

    try {
      const params = new URLSearchParams({
        latitude: String(position.latitude),
        longitude: String(position.longitude),
        current: "temperature_2m,relative_humidity_2m,weather_code",
        hourly:
          "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code",
        forecast_days: "1",
        timezone: "auto",
      });
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Data cuaca tidak dapat dimuat. Coba lagi sebentar.");
      }

      const result: WeatherApiResponse = await response.json();
      const current = result.current;

      if (
        !current ||
        !Number.isFinite(current.temperature_2m) ||
        !Number.isFinite(current.relative_humidity_2m) ||
        !Number.isFinite(current.weather_code)
      ) {
        throw new Error("Data cuaca yang diterima tidak valid.");
      }

      const hourly = result.hourly;
      const currentHourIndex = hourly?.time.indexOf(current.time) ?? -1;
      const currentDate = current.time.slice(0, 10);

      if (hourly) {
        setHourlyForecast(
          hourly.time.flatMap((hour, index) =>
            hour.startsWith(currentDate)
              ? [{
                  time: hour,
                  temperature: hourly.temperature_2m[index],
                  humidity: hourly.relative_humidity_2m[index],
                  precipitationProbability:
                    hourly.precipitation_probability[index] ?? null,
                  weatherCode: hourly.weather_code[index],
                }]
              : []
          )
        );
      }

      setWeather({
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        weatherCode: current.weather_code,
        precipitationProbability:
          currentHourIndex >= 0
            ? result.hourly?.precipitation_probability[currentHourIndex] ?? null
            : null,
      });
      setUpdatedAt(new Date());
    } catch (error) {
      setWeatherError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengambil data cuaca."
      );
    } finally {
      setIsLoadingWeather(false);
      setIsRefreshing(false);
    }
  }, []);

  const requestLocation = useCallback(async () => {
    setWeatherError("");
    setIsLoadingWeather(true);

    try {
      const position = await getCurrentPosition();
      setCoordinates(position);
      void loadWeather(position);

      const params = new URLSearchParams({
        latitude: String(position.latitude),
        longitude: String(position.longitude),
        localityLanguage: "id",
      });
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?${params.toString()}`,
          { cache: "force-cache" }
        );

        if (!response.ok) {
          throw new Error(`Reverse geocoding gagal (${response.status})`);
        }

        const result: ReverseGeocodingResponse = await response.json();
        const city = result.city || result.locality;
        setLocationName(
          [city, result.principalSubdivision].filter(Boolean).join(", ") ||
            result.countryName ||
            "Lokasi saat ini"
        );
      } catch (error) {
        console.error("Gagal mendapatkan nama lokasi:", error);
      }
    } catch (error) {
      setWeatherError(
        error instanceof Error
          ? error.message
          : "Gagal mendapatkan lokasi Anda."
      );
      setIsLoadingWeather(false);
    }
  }, [loadWeather]);

  useEffect(() => {
    const timeout = setTimeout(() => void requestLocation(), 0);
    return () => clearTimeout(timeout);
  }, [requestLocation]);

  useEffect(() => {
    if (!coordinates) return;

    const interval = setInterval(
      () => void loadWeather(coordinates),
      WEATHER_REFRESH_INTERVAL
    );

    return () => clearInterval(interval);
  }, [coordinates, loadWeather]);

  const timeZone = "Asia/Jakarta";
  const formattedTime = time
    ? time.toLocaleTimeString("id-ID", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : "--:--:--";
  const formattedDate = time
    ? time.toLocaleDateString("id-ID", {
        timeZone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Memuat tanggal...";
  const formattedUpdatedAt = updatedAt
    ? updatedAt.toLocaleTimeString("id-ID", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const weatherDetails = weather
    ? getWeatherDescription(weather.weatherCode)
    : null;
  const WeatherIcon = weatherDetails?.Icon ?? CloudSun;
  const formattedWeatherDate = time
    ? time.toLocaleDateString("id-ID", {
        timeZone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex gap-2 items-center">
      <div className="flex w-fit items-center gap-3 rounded-2xl px-2 py-1 order-2">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          <Clock3 size={25} strokeWidth={1.8} />
        </div>
        <div className="min-w-0">
          <p
            className="font-mono text-xl font-bold leading-tight tracking-tight text-indigo-700 tabular-nums dark:text-indigo-300"
            aria-label={`Waktu sekarang ${formattedTime}`}
          >
            {formattedTime}
          </p>
          <p className="mt-1 whitespace-nowrap text-xs font-medium capitalize text-slate-500 dark:text-slate-400">
            {formattedDate}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsWeatherModalOpen(true)}
        className="relative flex h-11 w-11 items-center justify-center rounded-xl text-indigo-600 transition-colors cursor-pointer bg-indigo-500/10 dark:text-indigo-300 dark:hover:bg-white/10"
        aria-label="Lihat tracking cuaca hari ini"
        aria-haspopup="dialog"
        title="Cuaca hari ini"
      >
        {isLoadingWeather ? (
          <LoaderCircle size={23} className="animate-spin" aria-hidden="true" />
        ) : (
          <AnimatedWeatherIcon
            code={weather?.weatherCode ?? -1}
            Icon={WeatherIcon}
            size={25}
          />
        )}
        {weather && (
          <span className="absolute -right-1 -top-1 rounded-full bg-indigo-600 px-1 text-[9px] font-semibold text-white dark:bg-indigo-400 dark:text-slate-950">
            {Math.round(weather.temperature)}°
          </span>
        )}
      </button>

      {isWeatherModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsWeatherModalOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="weather-modal-title"
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/10 bg-white p-5 text-slate-900 shadow-2xl dark:bg-slate-900 dark:text-slate-100 sm:p-7"
          >
            <header className="flex items-start justify-between gap-4">
              <div>
                <h2 id="weather-modal-title" className="text-xl font-bold sm:text-2xl">
                  Tracking Cuaca Hari Ini
                </h2>
                <p className="mt-1 text-sm capitalize text-slate-500 dark:text-slate-400">
                  {formattedWeatherDate} · {locationName}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsWeatherModalOpen(false)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                aria-label="Tutup tracking cuaca"
              >
                <X size={21} />
              </button>
            </header>

            <div className="mt-6 grid gap-4 sm:grid-cols-[1.2fr_1fr]">
              <div className="flex items-center gap-4 rounded-2xl bg-indigo-50 p-5 dark:bg-indigo-500/10">
                <AnimatedWeatherIcon
                  code={weather?.weatherCode ?? -1}
                  Icon={WeatherIcon}
                  className="h-14 w-14 shrink-0 text-amber-500 dark:text-amber-300"
                />
                <div>
                  {weather ? (
                    <>
                      <p className="text-4xl font-bold text-indigo-800 dark:text-indigo-200">
                        {Math.round(weather.temperature)}°C
                      </p>
                      <p className="font-semibold capitalize">
                        {weatherDetails?.description}
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold">
                      {isLoadingWeather ? "Memuat cuaca..." : "Cuaca belum tersedia"}
                    </p>
                  )}
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                    <MapPin size={14} aria-hidden="true" />
                    {locationName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <Droplets className="mb-2 text-sky-500" size={21} aria-hidden="true" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Kelembapan</p>
                  <p className="mt-1 text-xl font-bold">
                    {weather ? `${Math.round(weather.humidity)}%` : "--"}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10">
                  <Umbrella className="mb-2 text-violet-500" size={21} aria-hidden="true" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">Peluang hujan</p>
                  <p className="mt-1 text-xl font-bold">
                    {weather?.precipitationProbability == null
                      ? "--"
                      : `${Math.round(weather.precipitationProbability)}%`}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Perkiraan per jam</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Kondisi sepanjang hari ini
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (coordinates) {
                      void loadWeather(coordinates);
                    } else {
                      void requestLocation();
                    }
                  }}
                  disabled={isRefreshing || isLoadingWeather}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-indigo-600 transition-colors hover:bg-indigo-50 disabled:opacity-50 dark:border-white/10 dark:text-indigo-300 dark:hover:bg-white/5"
                >
                  {isRefreshing || isLoadingWeather ? (
                    <LoaderCircle size={16} className="animate-spin" />
                  ) : (
                    <RefreshCw size={16} />
                  )}
                  Perbarui
                </button>
              </div>

              {weatherError && (
                <div className="mb-3 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                  <p>{weatherError}</p>
                  {!coordinates && (
                    <button
                      type="button"
                      onClick={() => void requestLocation()}
                      className="mt-2 font-semibold underline underline-offset-2"
                    >
                      Izinkan lokasi dan coba lagi
                    </button>
                  )}
                </div>
              )}

              {hourlyForecast.length > 0 ? (
                <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-3">
                  {hourlyForecast.map((hour) => {
                    const details = getWeatherDescription(hour.weatherCode);
                    const HourIcon = details.Icon;
                    const hourLabel = hour.time.slice(11, 16);

                    return (
                      <div
                        key={hour.time}
                        className="flex min-w-24 flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 dark:border-white/10 dark:bg-white/[0.03]"
                        aria-label={`${hourLabel}, ${Math.round(hour.temperature)} derajat, ${details.description}, peluang hujan ${hour.precipitationProbability ?? "tidak tersedia"} persen`}
                      >
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          {hourLabel}
                        </span>
                        <AnimatedWeatherIcon
                          code={hour.weatherCode}
                          Icon={HourIcon}
                          className="my-3 text-indigo-500 dark:text-indigo-300"
                          size={22}
                        />
                        <span className="font-bold">{Math.round(hour.temperature)}°</span>
                        <span className="mt-2 flex items-center gap-1 text-xs text-sky-600 dark:text-sky-300">
                          <Umbrella size={12} aria-hidden="true" />
                          {hour.precipitationProbability == null
                            ? "--"
                            : `${Math.round(hour.precipitationProbability)}%`}
                        </span>
                        <span className="mt-1 text-[10px] text-slate-400">
                          {Math.round(hour.humidity)}% lembap
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-white/15 dark:text-slate-400">
                  {isLoadingWeather
                    ? "Mengambil perkiraan cuaca hari ini..."
                    : "Perkiraan per jam belum tersedia."}
                </div>
              )}
            </div>

            <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
              <span>
                {updatedAt
                  ? `Diperbarui otomatis · ${formattedUpdatedAt}`
                  : "Menunggu data cuaca"}
              </span>
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-indigo-500"
              >
                Sumber data: Open-Meteo
              </a>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}
