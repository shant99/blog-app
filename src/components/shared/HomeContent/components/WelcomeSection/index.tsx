import SplineRubic from "@/components/animations/SplineRubic";
import StaggeredLetters from "@/components/animations/StaggeredLetters";
import StaggeredText from "@/components/animations/StaggeredText";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function WelcomeSection() {
  const t = useTranslations();
  return (
    <div className="home-content__cubic-section">
      <div style={{ marginBottom: "100px" }}>
        <h1 className="cubic-section__title">
          <StaggeredLetters text={t("home.welcome_title")} />
        </h1>
        <h4 className="cubic-section__sub-title">
          <StaggeredText
            delay={1.3}
            once={false}
            text={t("home.welcome_sub_title")}
          />
        </h4>
        <div className="cubic-section__not-register">
          <span>{t("home.not_registered")}</span>
          <Link className="cubic-section__not-register-link" href="/register">
            {t("home.get_started")}
          </Link>
        </div>
      </div>
      <SplineRubic />
    </div>
  );
}
