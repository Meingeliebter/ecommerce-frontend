import { Truck, RotateCcw, Shield, Award } from "lucide-react";
import { useI18n } from "../../context/I18nContext";

export default function TrustBar() {
  const { t } = useI18n();

  const items = [
    { icon: Truck, text: t.home.trust.shipping },
    { icon: RotateCcw, text: t.home.trust.returns },
    { icon: Shield, text: t.home.trust.secure },
    { icon: Award, text: t.home.trust.authentic },
  ];

  return (
    <section
      className="grid grid-cols-2 gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-4 dark:border-neutral-800 dark:bg-neutral-900"
      aria-label="Garantías"
    >
      {items.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-3 px-2">
          <div className="rounded-full bg-primary/10 p-2.5">
            <Icon size={20} className="text-primary-dark" />
          </div>
          <span className="text-xs font-medium sm:text-sm">{text}</span>
        </div>
      ))}
    </section>
  );
}
