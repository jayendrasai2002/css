import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Users, TrendingUp, Shield, Zap } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F87619b67a1e74c6b899b073b86d99a13%2F2382b516c5954eee818efa7eb15a5ef9?format=webp&width=50&height=50"
              alt="Xpay"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-foreground">IT Exams</span>
          </div>
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-6 py-2.5 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary/5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:opacity-90 transition-opacity shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20 pb-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-32 right-32 w-96 h-96 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute -bottom-20 left-20 w-96 h-96 rounded-full bg-cyan-500 blur-3xl"></div>
          <div className="absolute top-40 left-96 w-64 h-64 rounded-full bg-green-500 blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
                <Shield className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-white/80">IT Professional Certification</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Professional IT Exams
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Master industry-leading certifications with our comprehensive exam platform. Real-world scenarios, instant feedback, and detailed performance analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10">
                <div className="space-y-6">
                  {[
                    { icon: Zap, label: "Real-time Feedback" },
                    { icon: TrendingUp, label: "Performance Analytics" },
                    { icon: Shield, label: "Secure Platform" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{item.label}</p>
                        <p className="text-white/60 text-sm">Instant results & insights</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Xpay IT Exams?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-leading platform trusted by professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Industry Exams",
                description: "Microsoft, AWS, Google Cloud, CompTIA & more certifications"
              },
              {
                icon: Clock,
                title: "Realistic Timing",
                description: "Practice with actual exam time constraints and conditions"
              },
              {
                icon: TrendingUp,
                title: "Advanced Analytics",
                description: "Track progress with detailed performance metrics"
              },
              {
                icon: Shield,
                title: "Secure Platform",
                description: "Enterprise-grade security and data protection"
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border border-blue-100 rounded-2xl hover:shadow-xl hover:border-primary/40 transition-all duration-300 bg-white"
              >
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by IT Professionals</h2>
            <p className="text-xl text-white/70">Join thousands preparing for industry certifications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1200+", label: "Certified Professionals" },
              { number: "50+", label: "IT Certifications" },
              { number: "99%", label: "Pass Rate" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <p className="text-white/80 text-lg">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Test Your Knowledge?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students already using ExamHub to prepare for success
          </p>
          <Link
            to="/exams"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F87619b67a1e74c6b899b073b86d99a13%2F2382b516c5954eee818efa7eb15a5ef9?format=webp&width=60&height=60"
                  alt="Xpay"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-white/70">Professional IT certifications for global careers</p>
            </div>
            {[
              { title: "Products", items: ["All Certifications", "Practice Tests", "Study Materials"] },
              { title: "Company", items: ["About Xpay", "Blog", "Careers"] },
              { title: "Support", items: ["Help Center", "Contact Us", "Documentation"] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold mb-6 text-white">{col.title}</h4>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-white/70 hover:text-primary transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>&copy; 2024 Xpay IT Exams. All rights reserved. | <a href="#" className="hover:text-primary">Privacy Policy</a> | <a href="#" className="hover:text-primary">Terms of Service</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
