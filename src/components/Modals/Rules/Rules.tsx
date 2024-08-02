import { GiThreeLeaves as LeaveIcon } from 'react-icons/gi';
import { Modal } from '@/components/ModalWrapper/ModalWrapper';
import styles from './rules.module.scss';

export const Rules = () => {
  return (
    <Modal>
      <div className={styles.rulesWrapper}>
        <div>
          <LeaveIcon className={styles.leavesIcon} />
          <p>
            Bilde so viele Wörter aus den vorhandenen Buchstaben wie möglich. Die einzelnen
            Buchstaben können merhmals verwendet werden. Du musst nicht alle Buchstaben nutzen; mit
            Ausnahme des goldenen Buchstabens in der Mitte - dieser muss in jedem Wort vorkommen.
          </p>
        </div>
        <div>
          <LeaveIcon className={styles.leavesIcon} />
          <p>
            Die Wörter müssen mindestens 4 Buchstaben lang sein, für diese bekommst du dann 1 Punkt.
            Wörter ab 5 Buchstaben werden mit 1 Punkt pro jeden Buchstaben gezählt. In jedem Spiel
            ist auch mindestens ein sogennantes Panagramm versteckt - ein Wort, in dem alle
            Buchstaben enthalten sind. Ein Panagramm bringt dir einen Bonus von 7 Punkten.
          </p>
        </div>
        <div>
          <LeaveIcon className={styles.leavesIcon} />
          <p>
            Um das Spiel zu gewinnen, musst das Level 9 BLABLA erreichen. Wie viele Punkte bis zum
            nächsten Level benötigt werden hängt davon ab, wie viele Wörter insgesammt an einem
            bestimmten Tag theoretisch gefunden werden können. Je mehr Wörter, desto mehr Punkte
            musst du sammeln.
          </p>
        </div>
      </div>
    </Modal>
  );
};
