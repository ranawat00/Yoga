import React, { useState, useRef, useCallback, useEffect } from 'react';
import './HomeVideoSlider.css';
import video1 from '../../assets/homeVideo/video1.mp4';
import video2 from '../../assets/homeVideo/video2.mp4';
import video3 from '../../assets/homeVideo/video3.mp4';

const VIDEOS_DATA = [
  {
    id: 1,
    title: 'Be Positive',
    video: video1
  },
  {
    id: 2,
    title: 'Believe In Yourself',
    video: video2
  },
  {
    id: 3,
    title: 'Inner Peace',
    video: video3
  }
];

export default function HomeVideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [playingState, setPlayingState] = useState({ 1: true, 2: true, 3: true });
  const [mutedState, setMutedState] = useState({ 1: true, 2: true, 3: true });
  const [modalVideo, setModalVideo] = useState(null);

  const sliderRef = useRef(null);
  const videoRefs = useRef({});

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS_DATA.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS_DATA.length) % VIDEOS_DATA.length);
  }, []);

  // Automatic slide transition every 4.5 seconds
  useEffect(() => {
    if (isPaused || modalVideo) return;
    const interval = setInterval(goNext, 4500);
    return () => clearInterval(interval);
  }, [isPaused, modalVideo, goNext]);

  // Smooth initial autoplay setup on mount (play only the active first video)
  useEffect(() => {
    VIDEOS_DATA.forEach((item, idx) => {
      const el = videoRefs.current[item.id];
      if (el) {
        el.muted = true;
        if (idx === 0) {
          const playPromise = el.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setPlayingState((prev) => ({ ...prev, [item.id]: true }));
              })
              .catch(() => {
                setPlayingState((prev) => ({ ...prev, [item.id]: false }));
              });
          }
        } else {
          el.pause();
          setPlayingState((prev) => ({ ...prev, [item.id]: false }));
        }
      }
    });
  }, []);

  // When currentIndex changes (slide transition), pause all other videos and play active slide video
  useEffect(() => {
    const activeItem = VIDEOS_DATA[currentIndex];
    if (!activeItem || modalVideo) return;

    VIDEOS_DATA.forEach((item) => {
      const el = videoRefs.current[item.id];
      if (el) {
        if (item.id === activeItem.id) {
          el.play()
            .then(() => {
              setPlayingState((prev) => ({ ...prev, [item.id]: true }));
            })
            .catch(() => {});
        } else {
          el.pause();
          setPlayingState((prev) => ({ ...prev, [item.id]: false }));
        }
      }
    });
  }, [currentIndex, modalVideo]);

  // Toggle video play / pause on click (Ensures single-video playback: pauses all other videos)
  const togglePlayPause = (id, e) => {
    if (e) e.stopPropagation();
    const targetVideoEl = videoRefs.current[id];
    if (!targetVideoEl) return;

    if (targetVideoEl.paused) {
      // Pause all other videos first
      VIDEOS_DATA.forEach((item) => {
        if (item.id !== id) {
          const otherEl = videoRefs.current[item.id];
          if (otherEl && !otherEl.paused) {
            otherEl.pause();
          }
        }
      });

      targetVideoEl
        .play()
        .then(() => {
          setPlayingState(() => {
            const next = {};
            VIDEOS_DATA.forEach((item) => {
              next[item.id] = (item.id === id);
            });
            return next;
          });
        })
        .catch((err) => console.error('Video play failed:', err));
    } else {
      targetVideoEl.pause();
      setPlayingState((prev) => ({ ...prev, [id]: false }));
    }
  };

  // Toggle sound ON / OFF (Mute / Unmute)
  const toggleSound = (id, e) => {
    if (e) e.stopPropagation();
    const videoEl = videoRefs.current[id];
    if (!videoEl) return;

    const newMuted = !videoEl.muted;
    videoEl.muted = newMuted;
    setMutedState((prev) => ({ ...prev, [id]: newMuted }));

    if (!newMuted && videoEl.paused) {
      // Pause all other videos when unmuting & playing
      VIDEOS_DATA.forEach((item) => {
        if (item.id !== id) {
          const otherEl = videoRefs.current[item.id];
          if (otherEl && !otherEl.paused) {
            otherEl.pause();
          }
        }
      });

      videoEl
        .play()
        .then(() => {
          setPlayingState(() => {
            const next = {};
            VIDEOS_DATA.forEach((item) => {
              next[item.id] = (item.id === id);
            });
            return next;
          });
        })
        .catch((err) => console.error('Video play failed on unmute:', err));
    }
  };

  // Open Fullscreen Expand Modal
  const openModal = (item, e) => {
    if (e) e.stopPropagation();
    const videoEl = videoRefs.current[item.id];
    if (videoEl) videoEl.pause();
    setModalVideo(item);
  };

  // Close Fullscreen Modal
  const closeModal = () => {
    setModalVideo(null);
  };

  // Synchronize scroll position with currentIndex
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    const card = container.querySelector('.home-video-card');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    container.scrollTo({
      left: currentIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  }, [currentIndex]);

  const handleManualScroll = useCallback(() => {
    const container = sliderRef.current;
    if (!container) return;
    window.requestAnimationFrame(() => {
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const card = container.querySelector('.home-video-card');
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const gap = 20;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(Math.max(0, index), VIDEOS_DATA.length - 1));
    });
  }, []);

  return (
    <section className="home-video-section" id="home-video-slider">
      <div className="home-video-container">
        <div className="home-video-header">
          <span className="home-video-badge">AFFIRMATIONS FOR YOU</span>
        </div>

        <div
          className="home-video-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="home-video-arrow prev"
            onClick={goPrev}
            aria-label="Previous video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div
            className="home-video-list"
            ref={sliderRef}
            onScroll={handleManualScroll}
          >
            {VIDEOS_DATA.map((item) => (
              <div key={item.id} className="home-video-card">
                <div
                  className="home-video-media-wrapper"
                  onClick={(e) => togglePlayPause(item.id, e)}
                >
                  <video
                    className="home-video-player"
                    ref={(el) => {
                      if (el) videoRefs.current[item.id] = el;
                    }}
                    src={item.video}
                    muted={mutedState[item.id]}
                    loop
                    playsInline
                    preload="auto"
                    onPlay={() => setPlayingState((prev) => ({ ...prev, [item.id]: true }))}
                    onPause={() => setPlayingState((prev) => ({ ...prev, [item.id]: false }))}
                  />

                  {/* Top Controls Bar: Sound ON/OFF & Fullscreen */}
                  <div className="home-video-top-controls">
                    <button
                      type="button"
                      className="home-video-control-chip"
                      onClick={(e) => openModal(item, e)}
                      title="Watch Fullscreen"
                      aria-label="Expand video"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                      <span>Expand</span>
                    </button>

                    <button
                      type="button"
                      className={`home-video-control-chip sound-chip ${mutedState[item.id] ? 'is-muted' : 'is-unmuted'}`}
                      onClick={(e) => toggleSound(item.id, e)}
                      title={mutedState[item.id] ? 'Turn Sound ON' : 'Turn Sound OFF'}
                      aria-label={mutedState[item.id] ? 'Turn Sound ON' : 'Turn Sound OFF'}
                    >
                      {mutedState[item.id] ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          </svg>
                          <span>Sound OFF</span>
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                          </svg>
                          <span>Sound ON</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Center Interactive Play / Pause Overlay Button */}
                  <button
                    type="button"
                    className={`home-video-play-btn ${playingState[item.id] ? 'is-playing' : 'is-paused'}`}
                    onClick={(e) => togglePlayPause(item.id, e)}
                    aria-label={playingState[item.id] ? 'Pause video' : 'Play video'}
                  >
                    {playingState[item.id] ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1.5" />
                        <rect x="14" y="4" width="4" height="16" rx="1.5" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '3px' }}>
                        <polygon points="5,3 19,12 5,21" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="home-video-card-content">
                  <h3 className="home-video-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <button
            className="home-video-arrow next"
            onClick={goNext}
            aria-label="Next video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="home-video-slider-dots">
          {VIDEOS_DATA.map((_, i) => (
            <button
              key={i}
              className={`home-video-dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to video slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal view */}
      {modalVideo && (
        <div className="home-video-modal-backdrop" onClick={closeModal}>
          <div className="home-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="home-video-modal-close" onClick={closeModal} aria-label="Close modal">
              ✕
            </button>
            <video
              className="home-video-modal-player"
              src={modalVideo.video}
              autoPlay
              controls
              playsInline
            />
            <div className="home-video-modal-footer">
              <h3 className="home-video-modal-title">{modalVideo.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
