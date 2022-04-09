class Component {
  constructor() {
    (this.btn = document.getElementsByClassName('btn_to_add')[0]),
      (this.input = document.getElementsByClassName('add_a_tag')[0]),
      (this.tagsArea = document.getElementsByClassName('tags_area')[0]),
      (this.checkbox = document.getElementsByClassName('read_only')[0]);
    this.arrayOfTags = [];

    this.setReadOnlyMode = this.setReadOnlyMode.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.setTagList = this.setTagList.bind(this);

    this.setReadOnlyMode();
    this.deleteTag();
    this.setTagList();
  }

  setTagList() {
    this.btn.addEventListener('click', () => {
      event.preventDefault();

      if (
        this.input.value != '' &&
        this.input.value.length <= 20 &&
        this.input.value.trim()
      ) {
        this.input.value.split().map((tag) => {
          this.arrayOfTags.push(tag);
        });

        this.createTag(this.arrayOfTags);
        this.setToLocalStorage();

        this.input.value = '';
      }
    });
  }

  setReadOnlyMode() {
    this.checkbox.addEventListener('click', () => {
      if (this.checkbox.checked) {
        this.input.setAttribute('readonly', 'readonly');
        this.input.placeholder = 'ReadOnly mode enabled';
        this.input.value = '';
        this.tagsArea.onclick = null;
      } else {
        this.input.removeAttribute('readonly', 'readonly');
        this.input.placeholder = 'Add a tag';

        this.deleteTag();
      }
    });
  }

  createTag(array) {
    const tag = document.createElement('div');

    tag.classList.add('tag');
    tag.innerHTML = array.slice(-1);
    tag.insertAdjacentHTML('beforeend', '<i class="far fa-times-circle"></i>');

    this.tagsArea.appendChild(tag);
  }

  setToLocalStorage() {
    localStorage.setItem('Tags', JSON.stringify(this.arrayOfTags));
  }

  deleteTag() {
    this.tagsArea.onclick = (event) => {
      let target = event.target;

      if (target.tagName == 'I') {
        const index = this.arrayOfTags.indexOf(target.parentNode.innerText, 0);

        this.tagsArea.removeChild(target.parentNode);

        this.arrayOfTags = [
          ...this.arrayOfTags.slice(0, index),
          ...this.arrayOfTags.slice(index + 1),
        ];

        this.setToLocalStorage();
      }
    };
  }
}
new Component();

window.onload = localStorage.clear();