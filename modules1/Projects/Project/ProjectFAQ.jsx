import React from 'react'
import FAQCard from '../Cards/FAQCard'
import GoalCard from '../Cards/GoalCard'

function ProjectFAQ({ project }) {
  return (
    <section className="project__faq">
      { project.faq.map(item => <FAQCard key={item.id} faq={item} project={project} />)}
    </section>
  )
}

export default ProjectFAQ