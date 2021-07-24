import React from 'react'
import LeafIcon from '../../includes/LeafIcon'

export default props => (
    <section className="home__welcome">
      <h3>Муниципальное общеобразовательное бюджетное учреждение
      средняя общеобразовательная школа № 100 города Сочи имени Героя Советского Союза Худякова Ивана Степановича</h3>
      <p>Педагогический клуб "Путь к совершенству" под лозунгом "Покори свой Олимп" приветствует вас.</p>
      <p>Уважаемые коллеги, здесь вы можете обмениваться опытом, поделиться своими наработками и секретами, изучить актуальную информацию, обсудить нововведения и изменения в области образования.</p>
      <p>Наша цель: объединение педагогов, содействие профессиональному общению и распространению педагогического опыта.</p>
      <section class="home__row row">
      <section class="home__column column column--sm-6 column--md-4">
      <p><strong>Темы дискуссий:</strong></p>
      <p><LeafIcon size="20" color="#35d461" /> Читательская грамотность.</p>
      <p><LeafIcon size="20" color="#35d461" /> Конструктор современного урока.</p>
      <p><LeafIcon size="20" color="#35d461" /> Рабочие программы в соответствии С Требованиями ФГОС. Изменения. Поправки.</p>
      </section>
      <section class="home__column column column--sm-6 column--md-4">
      <p><strong>График встреч:</strong></p>
      <p><LeafIcon size="20" color="#35d461" /> Тренинги, мастер классы и круглый стол:  последний четверг месяца.</p>
      <p><LeafIcon size="20" color="#35d461" /> Вебинары и конференции: первый понедельник месяца.</p>
      </section>
      <section class="home__column column column--sm-6 column--md-4">
      <p><strong>Другие проекты:</strong></p>
      <p><LeafIcon size="20" color="#35d461" /> Работа с одаренными детьми.</p>
      <p><LeafIcon size="20" color="#35d461" /> Сингапурская методика обучения.</p>
      <p><LeafIcon size="20" color="#35d461" /> Геймификация.</p>
      <p><LeafIcon size="20" color="#35d461" /> Коучинг в образовании.</p>
      </section>
      </section>
    </section>
  )