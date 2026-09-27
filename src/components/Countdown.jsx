import { useEffect, useState } from 'react'

function getTimeLeft(targetDate) {
  const diff = targetDate.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Countdown({ targetDate, labels }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const units = [
    { key: 'days', label: labels.days, value: timeLeft.days },
    { key: 'hours', label: labels.hours, value: timeLeft.hours },
    { key: 'minutes', label: labels.minutes, value: timeLeft.minutes },
    { key: 'seconds', label: labels.seconds, value: timeLeft.seconds },
  ]

  return (
    <div className="countdown">
      {units.map((unit) => (
        <div className="countdown__item" key={unit.key}>
          <span className="countdown__value">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

export default Countdown
