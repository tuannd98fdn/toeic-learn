"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import avatarImg from "../../../public/images/avatar-van-anh.jpg";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      
      {/* Brand Panel (Left Side on Desktop) */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <Link href="/" className={styles.logoBadge}>
            <div className={styles.logoIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
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
            <div className={styles.stars}>★★★★★</div>
            <p className={styles.quote}>
              "Giao diện đẹp và mượt mà nhất trong số các ứng dụng luyện thi mình từng dùng. Phương pháp Spaced Repetition thực sự hiệu quả!"
            </p>
            <div className={styles.author}>
              <div className={styles.authorAvatar}>
                <Image 
                  src={avatarImg} 
                  alt="Lê Thị Vân Anh" 
                  fill 
                  style={{ objectFit: 'cover' }} 
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
        <div className={styles.glassCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>Chào mừng trở lại</h2>
            <p className={styles.subtitle}>
              Đăng nhập để tiếp tục lộ trình học TOEIC của bạn
            </p>
          </div>

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className={styles.googleBtn}
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

          <div className={styles.footer}>
            <p>
              Bằng việc đăng nhập, bạn đồng ý với <a href="#">Điều khoản</a> và{" "}
              <a href="#">Bảo mật</a> của chúng tôi.
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
