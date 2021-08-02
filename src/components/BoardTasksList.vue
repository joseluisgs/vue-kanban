<template>
  <ul>
    <li
      v-for="task in tasks"
      :key="task.id"
      :class="{ completed: task.completed }"
      @click="completedTask(task)"
      @dblclick="deleteTask(task)"
    >
      {{ task.name }} <br />
      <small class="time">
        <i> hace: {{ timeAgo(task.createdAt) }}</i>
      </small>
    </li>
    <input
      type="text"
      placeholder="Añadir tarea..."
      v-model.trim="title"
      @keyup.enter="addTask()"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Task from '@/models/ITask';
// Librería de tiempo y su plugin de tiempo relativo
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import relativeTime from 'dayjs/plugin/relativeTime';
import { notify } from '@kyvg/vue3-notification';
import TasksStore from '@/store/TasksStore';

dayjs.locale('es');
dayjs.extend(relativeTime);

export default defineComponent({
  name: 'BoardTasksList',

  // Mis propiedades con verificación de tipos y requeridos
  props: {
    listId: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array as () => Array<Task>, // o si es un objeto complejp Object as PropType<MiInterface>
      required: true,
    },
  },

  setup(props) {
    // Mis datos
    const title = ref('');
    const tasksStore = TasksStore();
    // Mis métodos
    // Añade una tarea
    async function addTask() {
      console.log('addTask ->', title.value);
      if (title.value) {
        try {
          const taskID = await tasksStore.getNewTaskId(props.listId);
          const newTask = {
            id: taskID,
            name: title.value,
            createdAt: Date.now(),
            list: props.listId,
            completed: false,
          } as Task;
          // Añadimos
          // console.log('addTask ->', newTask);
          await tasksStore.createTask(newTask);
          notify({
            title: 'Tarea añadida',
            text: `Se ha añadido la tarea tareas: ${title.value}`,
            type: 'success',
          });
          title.value = '';
        } catch (error) {
          notify({
            title: 'Error',
            text: error.message,
            type: error,
          });
        }
      }
    }

    // Borra una tarea
    async function deleteTask(task: Task) {
      console.log('deleteTask -> ', task);
      // eslint-disable-next-line vue/no-mutating-props
      try {
        notify({
          title: 'Tarea eliminada',
          text: `Se ha eliminado la tarea tareas: ${task.name}`,
          type: 'error',
        });
        await tasksStore.removeTask(task);
      } catch (error) {
        notify({
          title: 'Error',
          text: error.message,
          type: error,
        });
      }
    }

    // Marca como completado
    async function completedTask(task: Task) {
      console.log('completedTask -> ', task);
      /* eslint-disable no-param-reassign */
      task.completed = !task.completed;
      await tasksStore.createTask(task);
    }

    // tiempo
    function timeAgo(timestamp: number|undefined) {
      if (timestamp) {
        const date = new Date(timestamp);
        return dayjs().from(dayjs(date), true);
      }
      return '';
    }
    // Mi Visibilidad
    return {
      title,
      addTask,
      deleteTask,
      completedTask,
      timeAgo,
    };
  },
});
</script>

<style lang="scss" scoped>
ul {
  // Quitamos las cosas
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  background-color: #fafafa;
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  margin: 0.25rem 0;
  padding: 1rem;

  &.completed {
    background-color: #cfd8dc;
    color: #90a4ae;
  }
  &.time {
    color: gray;
    font-size: 10px;
  }
}

input {
  box-sizing: border-box;
  background-color: #eceff1;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  outline: 0;
  margin: 0.25rem 0;
  padding: 1rem;
  transition: background-color 600ms ease;
  width: 100%;

  &:focus,
  &:active {
    background-color: #fafafa;
    border-bottom: 1px solid #ccc;
    margin: 0.25rem 0;
    padding: 1rem;
  }

  &::placeholder {
    color: #90a4ae;
  }
}
</style>
