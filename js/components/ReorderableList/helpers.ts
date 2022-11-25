import { ItemBase } from "./reorderable";

interface CreateOptions {
  idPrefix?: string;
}

export function createReorderableItems(data: any[], options: CreateOptions) {
  return data.map<ItemBase>((d: any, index: number) => {
    let r: ItemBase =
      typeof d === "object"
        ? { id: undefined, ...d }
        : { id: undefined, item: d };
    if (options?.idPrefix) r.id = options.idPrefix + index;
    else r.id = `reorderable_${index}`;

    return r;
  });
}
