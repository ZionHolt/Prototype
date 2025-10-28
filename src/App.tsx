import React, { useState } from 'react';
import { FlashcardCreator } from './components/FlashcardCreator';
import { FlashcardLibrary } from './components/FlashcardLibrary';
import { CommunityLibrary } from './components/CommunityLibrary';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { 
  Upload, 
  BookOpen, 
  Users, 
  Brain,
  Home
} from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

type ViewMode = 'home' | 'create' | 'library' | 'community';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');

  const handleSaveFlashcards = (cards: Flashcard[], deckName: string) => {
    console.log('Saving flashcards:', { cards, deckName });
    setCurrentView('library');
  };

  const handleStartStudy = (deckId: string) => {
    console.log('Starting study for deck:', deckId);
    // You can implement study mode here
  };

  const handleImportFromCommunity = (deckId: string) => {
    console.log('Importing deck:', deckId);
    setCurrentView('library');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return <FlashcardCreator onSaveFlashcards={handleSaveFlashcards} />;
      
      case 'library':
        return (
          <FlashcardLibrary 
            onStartStudy={handleStartStudy}
            onCreateNew={() => setCurrentView('create')}
          />
        );
      
      case 'community':
        return <CommunityLibrary onImportDeck={handleImportFromCommunity} />;
      
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center py-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold text-blue-600">
              AI Study Companion
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Smart flashcard generation from course materials
            </p>
          </div>
        </div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Transform your lecture notes, PDFs, and course materials into personalized flashcards. 
          Our AI analyzes your documents and creates targeted study aids.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => setCurrentView('create')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload & Generate
          </Button>
          <Button 
            onClick={() => setCurrentView('community')}
            variant="outline" 
            size="lg"
            className="px-8"
          >
            <Users className="w-5 h-5 mr-2" />
            Browse Community
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card 
          onClick={() => setCurrentView('create')}
          className="cursor-pointer hover:shadow-lg transition-shadow p-6"
        >
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold">AI-Assisted Creation</h3>
            <p className="text-gray-600">
              Upload course materials and let AI generate customized flashcards automatically.
            </p>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setCurrentView('library')}
          className="cursor-pointer hover:shadow-lg transition-shadow p-6"
        >
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Personal Library</h3>
            <p className="text-gray-600">
              Organize flashcard sets, track progress, and study with spaced repetition.
            </p>
          </CardContent>
        </Card>

        <Card 
          onClick={() => setCurrentView('community')}
          className="cursor-pointer hover:shadow-lg transition-shadow p-6"
        >
          <CardContent className="space-y-4">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-semibold">Community Library</h3>
            <p className="text-gray-600">
              Discover and share flashcard decks with students worldwide.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-2xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-8">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Upload Materials</h3>
            <p className="text-gray-600">
              Upload lecture notes, PDFs, or study materials in various formats.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. AI Processing</h3>
            <p className="text-gray-600">
              AI analyzes content and automatically generates targeted flashcards.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Study & Share</h3>
            <p className="text-gray-600">
              Review flashcards, track progress, and share with the community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">AI Study Companion</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              
              <button
                onClick={() => setCurrentView('create')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'create'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Upload className="w-4 h-4" />
                Create
              </button>
              
              <button
                onClick={() => setCurrentView('library')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'library'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Library
              </button>
              
              <button
                onClick={() => setCurrentView('community')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === 'community'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                Community
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[calc(100vh-80px)]">
        {renderCurrentView()}
      </div>
    </div>
  );
}