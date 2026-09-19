"use client";

import React, { Suspense, useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import avatarImg from "../../../public/images/avatar-van-anh.jpg";
import { ArrowLeftIcon, UserIcon, HomeIcon } from "@/components/icons/AppIcons";
import { storage } from "@/utils/storage";
import styles from "./page.module.css";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isGuest, setIsGuest] = useState<boolean>(false);

  useEffect(() => {
    const guestStored = storage.get<boolean>("toeic_guest_mode", false);
    setIsGuest(Boolean(guestStored));
  }, []);

  const handleBack = () => {
    // If callbackUrl is set and user is not yet a guest, navigating to a protected route
    // would immediately bounce back to /login, creating an infinite redirect loop.
    // In that case, navigate safely to /landing.
    if (callbackUrl && !isGuest) {
      router.push("/landing");
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1 && document.referrer && !document.referrer.includes("/login")) {
      router.back();
      return;
    }

    router.push(isGuest ? "/" : "/landing");
  };

  const handleContinueAsGuest = () => {
    // 1. Set guest cookie (accessible to Next.js middleware)
    document.cookie = "toeic_guest_mode=1; path=/; max-age=2592000; SameSite=Lax";
    // 2. Set local storage flag
    storage.set("toeic_guest_mode", "true");
    setIsGuest(true);

    // 3. Resolve destination URL
    const targetUrl = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login")
      ? callbackUrl
      : "/";

    router.push(targetUrl);
  };

  const targetCallback = callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("/login")
    ? callbackUrl
    : "/";

  return (
    <div className={styles.glassCard}>
      {/* Top Navigation Bar */}
      <div className={styles.cardNav}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backBtn}
          id="login-back-btn"
          title="Quay lại"
        >
          <ArrowLeftIcon size={16} />
          <span>Quay lại</span>
        </button>

        <Link
          href={isGuest ? "/" : "/landing"}
          className={styles.homeLink}
          id="login-home-link"
          title="Về trang chủ"
        >
          <HomeIcon size={16} />
          <span>{isGuest ? "Bàn học" : "Trang chủ"}</span>
        </Link>
      </div>

      <div className={styles.header}>
        <h2 className={styles.title}>Chào mừng trở lại</h2>
        <p className={styles.subtitle}>
          Đăng nhập để tiếp tục lộ trình học TOEIC của bạn
        </p>
      </div>

      {/* Google OAuth Button */}
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: targetCallback })}
        className={styles.googleBtn}
        id="login-google-btn"
      >
        <svg
          className={styles.googleIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          />
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          />
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          />
          <path fill="none" d="M0 0h48v48H0z" />
        </svg>
        Tiếp tục với Google
      </button>

      {/* Elegant Divider */}
      <div className={styles.divider}>
        <span className={styles.dividerLine} />
        <span className={styles.dividerText}>hoặc</span>
        <span className={styles.dividerLine} />
      </div>

      {/* Guest Escape Hatch Button */}
      <button
        type="button"
        onClick={handleContinueAsGuest}
        className={styles.guestBtn}
        id="login-guest-btn"
      >
        <UserIcon size={18} />
        <span>Tiếp tục với tư cách Khách</span>
      </button>
      <p className={styles.guestHint}>
        Học thử ngay • Tiến độ tự động lưu trên trình duyệt này
      </p>

      <div className={styles.footer}>
        <p>
          Bằng việc đăng nhập, bạn đồng ý với <a href="#">Điều khoản</a> và{" "}
          <a href="#">Bảo mật</a> của chúng tôi.
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className={styles.container}>
      {/* Brand Panel (Left Side on Desktop) */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Link href="/" className={styles.logoBadge} id="login-brand-logo">
            <div className={styles.logoIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            TOEIC Master
          </Link>

          <h1 className={styles.brandHeadline}>
            Chinh phục TOEIC <br />
            <span className={styles.highlightText}>thông minh hơn.</span>
          </h1>

          <p className={styles.brandSubheadline}>
            Hệ thống học tập ứng dụng AI phân tích điểm yếu, cá nhân hóa lộ trình và giúp bạn đạt target nhanh gấp 2 lần.
          </p>

          <div className={styles.testimonialCard}>
            <div className={styles.stars}>5.0 / 5.0 Rating</div>
            <p className={styles.quote}>
              &quot;Giao diện đẹp và mượt mà nhất trong số các ứng dụng luyện thi mình từng dùng. Phương pháp Spaced Repetition thực sự hiệu quả!&quot;
            </p>
            <div className={styles.author}>
              <div className={styles.authorAvatar}>
                <Image
                  src={avatarImg}
                  alt="Lê Thị Vân Anh"
                  fill
                  sizes="48px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <strong>Lê Thị Vân Anh</strong>
                <span>Đạt 850 TOEIC sau 1 tháng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className={styles.glowOrb}></div>
        <div className={styles.gridOverlay}></div>
      </div>

      {/* Auth Panel (Right Side on Desktop) */}
      <div className={styles.authPanel}>
        <Suspense fallback={<div className={styles.loadingCard}>Đang tải...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
