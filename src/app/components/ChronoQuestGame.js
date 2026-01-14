'use client';

import { useState } from 'react';
import { gameData } from '../data/gameData';
import IntroScreen from './IntroScreen';
import CharacterSelection from './CharacterSelection';
import EraSelector from './EraSelector';
import InteractiveEraView from './InteractiveEraView';
import GameComplete from './GameComplete';

export default function ChronoQuestGame() {
  const [gameState, setGameState] = useState({
    gameStarted: false,
    characterSelected: false,
    selectedCharacter: null,
    currentEra: null,
    completedEras: [],
    artifacts: [],
  });

  const handleStartGame = () => {
    setGameState({
      ...gameState,
      gameStarted: true,
    });
  };

  const handleCharacterSelect = (character) => {
    setGameState({
      ...gameState,
      characterSelected: true,
      selectedCharacter: character,
    });
  };

  const handleSelectEra = (era) => {
    setGameState({
      ...gameState,
      currentEra: era,
    });
  };

  const handleEraComplete = (era) => {
    const newCompletedEras = [...gameState.completedEras, era.id];
    const newArtifacts = [...gameState.artifacts, era.artifact];

    setGameState({
      ...gameState,
      completedEras: newCompletedEras,
      artifacts: newArtifacts,
      currentEra: null,
    });
  };

  const handleReturnToHub = () => {
    setGameState({
      ...gameState,
      currentEra: null,
    });
  };

  const handleRestart = () => {
    setGameState({
      gameStarted: false,
      characterSelected: false,
      selectedCharacter: null,
      currentEra: null,
      completedEras: [],
      artifacts: [],
    });
  };

  // Check if game is complete
  const isGameComplete = gameState.completedEras.length === gameData.eras.length;

  // Show intro screen if game hasn't started
  if (!gameState.gameStarted) {
    return <IntroScreen onStart={handleStartGame} />;
  }

  // Show character selection if character not selected
  if (!gameState.characterSelected) {
    return <CharacterSelection onSelect={handleCharacterSelect} />;
  }

  // Show completion screen if all eras are completed
  if (isGameComplete) {
    return <GameComplete artifacts={gameState.artifacts} onRestart={handleRestart} />;
  }

  // Show era view if an era is selected
  if (gameState.currentEra) {
    return (
      <InteractiveEraView
        era={gameState.currentEra}
        character={gameState.selectedCharacter}
        onComplete={handleEraComplete}
        onReturn={handleReturnToHub}
      />
    );
  }

  // Show era selector
  return (
    <EraSelector
      eras={gameData.eras}
      completedEras={gameState.completedEras}
      onSelectEra={handleSelectEra}
    />
  );
}
