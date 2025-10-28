import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Play, Plus, Search } from 'lucide-react';
import { Input } from './ui/input';

interface FlashcardDeck {
  id: string;
  name: string;
  description: string;
  cardCount: number;
  lastStudied?: Date;
}

interface FlashcardLibraryProps {
  onStartStudy: (deckId: string) => void;
  onCreateNew: () => void;
}

export function FlashcardLibrary({ onStartStudy, onCreateNew }: FlashcardLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const [decks] = useState<FlashcardDeck[]>([
    {
      id: '1',
      name: 'Biology - Cell Structure',
      description: 'Key concepts about cell organelles',
      cardCount: 25,
      lastStudied: new Date(2024, 9, 29)
    },
    {
      id: '2',
      name: 'Spanish Vocabulary',
      description: 'Common words and phrases',
      cardCount: 50,
      lastStudied: new Date(2024, 9, 27)
    }
  ]);

  const filteredDecks = decks.filter(deck =>
    deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            My Flashcard Library
          </h1>
          <p className="text-gray-600 mt-1">Manage and study your collections</p>
        </div>
        <Button 
          onClick={onCreateNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Deck
        </Button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search decks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDecks.map((deck) => (
          <Card key={deck.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{deck.name}</CardTitle>
              <p className="text-gray-600 text-sm">{deck.description}</p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Cards</p>
                  <p className="font-semibold">{deck.cardCount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Last Studied</p>
                  <p className="font-semibold">
                    {deck.lastStudied ? deck.lastStudied.toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => onStartStudy(deck.id)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Study Now
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
            <p className="text-gray-500">Try adjusting your search terms</p>
          </CardContent>
        </Card>
      )}

      {decks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No flashcard decks yet</h3>
            <p className="text-gray-500 mb-4">Create your first deck to get started</p>
            <Button onClick={onCreateNew}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Deck
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}