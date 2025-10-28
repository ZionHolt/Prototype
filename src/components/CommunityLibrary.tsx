import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Users, Search, Download, Star } from 'lucide-react';

interface CommunityDeck {
  id: string;
  title: string;
  description: string;
  author: string;
  cardCount: number;
  downloads: number;
  rating: number;
  subject: string;
}

interface CommunityLibraryProps {
  onImportDeck: (deckId: string) => void;
}

export function CommunityLibrary({ onImportDeck }: CommunityLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const [communityDecks] = useState<CommunityDeck[]>([
    {
      id: '1',
      title: 'Organic Chemistry Reactions',
      description: 'Essential organic chemistry reactions for students',
      author: 'Dr. Sarah Chen',
      cardCount: 127,
      downloads: 2840,
      rating: 4.8,
      subject: 'Chemistry'
    },
    {
      id: '2',
      title: 'World History: WWI & WWII',
      description: 'Key dates and events from both World Wars',
      author: 'Prof. Michael Torres',
      cardCount: 89,
      downloads: 1920,
      rating: 4.6,
      subject: 'History'
    },
    {
      id: '3',
      title: 'Python Programming Basics',
      description: 'Essential Python concepts for beginners',
      author: 'Alex Johnson',
      cardCount: 156,
      downloads: 4120,
      rating: 4.9,
      subject: 'Computer Science'
    }
  ]);

  const filteredDecks = communityDecks.filter(deck =>
    deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Chemistry': 'bg-purple-100 text-purple-700',
      'History': 'bg-amber-100 text-amber-700',
      'Computer Science': 'bg-blue-100 text-blue-700'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <Users className="w-8 h-8 text-blue-600" />
            Community Library
          </h1>
          <p className="text-gray-600 mt-1">Discover flashcards from other students</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Share Your Deck
        </Button>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search community decks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => (
          <Card key={deck.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{deck.title}</CardTitle>
                  <p className="text-gray-600 text-sm mt-1">{deck.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">by {deck.author}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getSubjectColor(deck.subject)}>
                  {deck.subject}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="font-semibold">{deck.cardCount}</p>
                  <p className="text-gray-600">Cards</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">{deck.downloads.toLocaleString()}</p>
                  <p className="text-gray-600">Downloads</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="font-semibold">{deck.rating}</span>
                  </div>
                  <p className="text-gray-600">Rating</p>
                </div>
              </div>

              <Button 
                onClick={() => onImportDeck(deck.id)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Import Deck
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDecks.length === 0 && searchQuery && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No decks found</h3>
            <p className="text-gray-500">Try different search terms</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}