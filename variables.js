import Variable from './models/variable.js';
import Slab from './models/slab.js';

class VariableCache {
  constructor() {
    this.isLoaded = false;
    this.variables = [];
    this.slabs = [];
    this.init();
  }

  init() {
    this.load();
    this.watchForChanges();
  }

  async load() {
    await Promise.all([this.loadVariables(), this.loadSlabs()]);
    this.isLoaded = true;
  }

  async loadVariables() {
    const data = await Variable.aggregate()
      .sort({ createdAt: -1 })
      .group({
        _id: '$name',
        data: { $first: '$$ROOT' },
      });

    this.variables = data.map((item) => item.data);
  }

  async loadSlabs() {
    const data = await Slab.aggregate()
      .sort({ createdAt: -1 })
      .group({
        _id: '$name',
        data: { $first: '$$ROOT' },
      });

    this.slabs = data.map((item) => item.data);
  }

  async checkForLoaded() {
    if (!this.isLoaded) {
      await this.load();
    }
  }

  async getFullValue(key, throwError) {
    await this.checkForLoaded();
    const item = this.variables.find((item) => item.name === key);
    if (!item && throwError) throw new Error(`variable ${key} does not exist`);

    return item;
  }

  async get(key, throwError = true, defaultValue) {
    const item = await this.getFullValue(key, throwError);

    return item?.value ?? defaultValue ?? null;
  }

  async getMultiple(keys) {
    await this.checkForLoaded();
    const values = await Promise.all(keys.map((key) => this.get(key)));

    return values;
  }

  async getComparedValue(key, amount) {
    const item = await this.getFullValue(key);

    const fixedValue = item.value;
    const percentageValue = amount * (item.percentage / 100);

    const getFinalValue = () => {
      if (item.comparison === 'more') {
        return fixedValue > percentageValue ? fixedValue : percentageValue;
      } else if (item.comparison === 'less') {
        return fixedValue < percentageValue ? fixedValue : percentageValue;
      } else if (fixedValue === percentageValue) {
        return fixedValue;
      } else if (item.comparison) {
        throw new Error('Invalid comparison value');
      } else {
        throw new Error('No value in comparison field');
      }
    };

    return getFinalValue();
  }

  getSlab(slabName) {
    const slab = this.slabs.find((item) => item.name === slabName);
    if (!slab) throw new Error(`Slab ${slabName} does not exist`);

    return slab;
  }

  async getAppliedSlab(slabName, value) {
    const slab = this.getSlab(slabName);

    const item = slab.ranges.find(
      (item) => item.min <= value && item.max >= value
    );

    return item?.value ?? 0;
  }

  watchForChanges() {
    // const stream = Variable.watch([]);
    // stream.on('change', () => this.load());
    setInterval(() => {
      this.load();
    }, 60000 * 3);
  }
}

export default new VariableCache();
