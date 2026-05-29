import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Clock, BarChart3, ArrowRight, Search, LogOut } from "lucide-react";
import { useState } from "react";

interface Exam {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  questions: number;
  difficulty: "Easy" | "Medium" | "Hard";
  attempts: number;
  passingScore: number;
}

const mockExams: Exam[] = [
  {
    id: "1",
    title: "General Knowledge 101",
    description: "Test your general knowledge across various topics",
    category: "General",
    duration: 45,
    questions: 50,
    difficulty: "Easy",
    attempts: 3,
    passingScore: 70
  },
  {
    id: "2",
    title: "Advanced Mathematics",
    description: "Master calculus, algebra, and geometry concepts",
    category: "Mathematics",
    duration: 90,
    questions: 40,
    difficulty: "Hard",
    attempts: 2,
    passingScore: 75
  },
  {
    id: "3",
    title: "Biology Fundamentals",
    description: "Comprehensive biology exam covering all major topics",
    category: "Science",
    duration: 60,
    questions: 60,
    difficulty: "Medium",
    attempts: 3,
    passingScore: 70
  },
  {
    id: "4",
    title: "English Grammar Mastery",
    description: "Test your grammar, vocabulary, and comprehension skills",
    category: "English",
    duration: 50,
    questions: 45,
    difficulty: "Medium",
    attempts: 3,
    passingScore: 65
  },
  {
    id: "5",
    title: "World History",
    description: "Explore key events and figures in world history",
    category: "History",
    duration: 75,
    questions: 55,
    difficulty: "Hard",
    attempts: 2,
    passingScore: 72
  },
  {
    id: "6",
    title: "Physics Essentials",
    description: "Understand mechanics, waves, and modern physics",
    category: "Science",
    duration: 80,
    questions: 50,
    difficulty: "Hard",
    attempts: 2,
    passingScore: 75
  }
];

const difficultyColors = {
  Easy: "bg-green-100 text-green-800",
  Medium: "bg-amber-100 text-amber-800",
  Hard: "bg-red-100 text-red-800"
};

export default function Exams() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const categories = [...new Set(mockExams.map(exam => exam.category))];

  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || exam.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F87619b67a1e74c6b899b073b86d99a13%2F2382b516c5954eee818efa7eb15a5ef9?format=webp&width=50&height=50"
              alt="Xpay"
              className="h-8 w-auto"
            />
            <span className="text-lg font-bold text-foreground">IT Exams</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="text-sm text-muted-foreground">
              {filteredExams.length} Professional Certifications
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="text-sm text-foreground font-medium">
              Hi, {user.name || user.email}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors border border-primary/20"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            IT Professional Certifications
          </h1>
          <p className="text-lg text-muted-foreground">
            Master industry-leading certifications with real-world exam scenarios
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Search */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Search Exams
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Categories
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === null
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exams Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredExams.length > 0 ? (
                filteredExams.map(exam => (
                  <Link
                    key={exam.id}
                    to={`/exam/${exam.id}`}
                    className="group h-full"
                  >
                    <div className="h-full p-6 border border-border rounded-2xl hover:shadow-lg hover:border-primary/20 transition-all duration-300 bg-white flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {exam.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {exam.category}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${difficultyColors[exam.difficulty]}`}>
                          {exam.difficulty}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm mb-6 flex-1">
                        {exam.description}
                      </p>

                      <div className="space-y-3 mb-6 pb-6 border-b border-border">
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-foreground font-medium">{exam.duration} minutes</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-foreground font-medium">{exam.questions} questions</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <BarChart3 className="w-4 h-4 text-primary" />
                          <span className="text-foreground font-medium">{exam.passingScore}% to pass</span>
                        </div>
                      </div>

                      <button className="w-full px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group/btn">
                        Start Exam
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No exams found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
