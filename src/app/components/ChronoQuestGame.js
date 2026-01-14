'use client';

import { useState, useEffect } from 'react';
import { gameData } from '../data/gameData';
import IntroScreen from './IntroScreen';
import CharacterSelection from './CharacterSelection';
import EraSelector from './EraSelector';
import InteractiveEraView from './InteractiveEraView';
import GameComplete from './GameComplete';
import { auth, googleProvider, db } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function ChronoQuestGame() {
  const [gameState, setGameState] = useState({
    gameStarted: false,
    characterSelected: false,
    selectedCharacter: null,
    currentEra: null,
    completedEras: [],
    artifacts: [],
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load user progress
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setGameState(prev => ({
            ...prev,
            completedEras: data.completedEras || [],
            artifacts: data.artifacts || [],
            gameStarted: true // Auto-start if logged in
          }));
        } else {
          // Initialize new user
          await setDoc(userRef, {
            email: currentUser.email,
            completedEras: [],
            artifacts: [],
            lastLogin: new Date()
          });
          setGameState(prev => ({ ...prev, gameStarted: true }));
        }
      } else {
        // Reset state on logout
        setGameState(prev => ({
          ...prev,
          gameStarted: false,
          characterSelected: false,
          selectedCharacter: null,
          completedEras: [],
          artifacts: []
        }));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
      if (error.code === 'auth/configuration-not-found') {
        alert("Firebase Authentication has not been enabled for this project yet. Please enable it in the Firebase Console.");
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleStartGame = () => {
    // If not logged in, trigger login. 
    // If logged in, gameStarted is already set by useEffect.
    if (!user) {
      handleLogin();
    }
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

  const handleEraComplete = async (era) => {
    const newCompletedEras = [...gameState.completedEras, era.id];
    const newArtifacts = [...gameState.artifacts, era.artifact];

    setGameState({
      ...gameState,
      completedEras: newCompletedEras,
      artifacts: newArtifacts,
      currentEra: null,
    });

    // Save to Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        completedEras: arrayUnion(era.id),
        artifacts: arrayUnion(era.artifact)
      });
    }
  };

  const handleReturnToHub = () => {
    setGameState({
      ...gameState,
      currentEra: null,
    });
  };

  const handleBackToCharacterSelect = () => {
    setGameState({
      ...gameState,
      characterSelected: false,
      selectedCharacter: null,
    });
  };

  const handleBackToIntro = () => {
    setGameState({
      ...gameState,
      gameStarted: false,
    });
  };

  const handleRestart = async () => {
    // Option: Clear progress or just replay? 
    // Usually "Restart" on game complete means "Clear Progress". 
    // But since we are saving persistent progress, maybe just reset local state to hub?
    // Let's reset everything for a "New Game" experience if they choose to restart from the End Screen.
    // However, the prompt emphasizes "ensure their progress is saved". 
    // I'll assume handleRestart clears everything for a fresh run.

    setGameState({
      gameStarted: true, // Keep them logged in and in "game" mode
      characterSelected: false,
      selectedCharacter: null,
      currentEra: null,
      completedEras: [],
      artifacts: [],
    });

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        completedEras: [],
        artifacts: []
      });
    }
  };

  // Check if game is complete
  const isGameComplete = gameState.completedEras.length === gameData.eras.length;

  if (loading) return (
    <div className="min-h-screen bg-black text-cyan-500 flex flex-col items-center justify-center gap-6 font-sans">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyan-500/20 rounded-full animate-spin border-t-cyan-500" />
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl animate-pulse rounded-full" />
      </div>
      <div className="text-xl font-bold tracking-[0.3em] uppercase animate-pulse">Initializing Chrono-Systems...</div>
    </div>
  );

  // Show intro screen if game hasn't started (i.e., not logged in or explicitly went back)
  if (!gameState.gameStarted) {
    return <IntroScreen onStart={handleStartGame} />;
  }

  // Show character selection if character not selected
  if (!gameState.characterSelected) {
    return (
      <CharacterSelection
        onSelect={handleCharacterSelect}
        user={user}
        onLogout={handleLogout}
        onBack={handleBackToIntro}
      />
    );
  }

  // Show completion screen if all eras are completed
  if (isGameComplete) {
    return <GameComplete artifacts={gameState.artifacts} onRestart={handleRestart} onBack={handleBackToCharacterSelect} />;
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
      user={user}
      onLogout={handleLogout}
      onBack={handleBackToCharacterSelect}
    />
  );
}
