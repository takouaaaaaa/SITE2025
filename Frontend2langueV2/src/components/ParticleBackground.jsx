import React, { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Smart Industry Particle System
    const particles = []
    const particleCount = 60
    const colors = [
      'rgba(6, 182, 212, 0.8)',    // Cyan - IoT sensors
      'rgba(124, 58, 237, 0.8)',   // Purple - AI/ML
      'rgba(16, 185, 129, 0.8)',   // Green - Sustainability
      'rgba(59, 130, 246, 0.8)',   // Blue - Automation
      'rgba(255, 255, 255, 0.6)'   // White - Data
    ]

    class SmartParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 3 + 1
        this.opacity = Math.random() * 0.6 + 0.3
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
        this.isHub = Math.random() < 0.1 // 10% chance to be a hub node
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        // Pulse effect for technology feel
        this.pulsePhase += this.pulseSpeed
        this.currentRadius = this.radius + Math.sin(this.pulsePhase) * 0.5
      }

      draw() {
        // Main particle
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()

        // Hub nodes get extra glow
        if (this.isHub) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.currentRadius * 2, 0, Math.PI * 2)
          ctx.fillStyle = this.color.replace(/[\d\.]+\)$/g, '0.1)')
          ctx.fill()
        }
      }
    }

    // Initialize smart particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new SmartParticle())
    }

    // Smart Industry Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw smart network connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Different connection distances for different types
          const maxDistance = (particle.isHub || otherParticle.isHub) ? 150 : 120

          if (distance < maxDistance) {
            const opacity = 0.15 * (1 - distance / maxDistance)

            // Data flow effect
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            // Different colors for different connection types
            if (particle.isHub || otherParticle.isHub) {
              ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 1.5})` // Cyan for hub connections
              ctx.lineWidth = 2
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})` // White for regular connections
              ctx.lineWidth = 1
            }
            ctx.stroke()

            // Add data pulse effect on strong connections
            if (distance < 80 && Math.random() < 0.02) {
              const midX = (particle.x + otherParticle.x) / 2
              const midY = (particle.y + otherParticle.y) / 2
              ctx.beginPath()
              ctx.arc(midX, midY, 2, 0, Math.PI * 2)
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
              ctx.fill()
            }
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default ParticleBackground
