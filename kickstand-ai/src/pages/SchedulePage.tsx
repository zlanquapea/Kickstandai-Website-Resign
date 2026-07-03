import ScheduleChat from '../components/ScheduleChat'
import usePageTitle from '../hooks/usePageTitle'

function SchedulePage() {
  usePageTitle('Schedule a Chat')
  return <ScheduleChat />
}

export default SchedulePage
